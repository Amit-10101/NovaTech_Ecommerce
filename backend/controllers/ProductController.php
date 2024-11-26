<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../models/SubCategory.php';
require_once __DIR__ . '/../models/Brand.php';
require_once __DIR__ . '/../config/Database.php';

class ProductController extends BaseController {
    private PDO $conn;
    private CategoryController $categoryController;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->categoryController = new CategoryController();
    }

    public function createProduct(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Product::getTableName() . ' (category_id, sub_category_id, brand_id, product_name, price, stock_quantity, description, image_url) VALUES (:category_id, :sub_category_id, :brand_id, :product_name, :price, :stock_quantity, :description, :image_url)';

        $category = $this->categoryController->getCategoryByName($data['category_name']);
        $category_id = $category->getCategoryId();

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':sub_category_id', $data['sub_category_id']);
        $stmt->bindParam(':brand_id', $data['brand_id']);
        $stmt->bindParam(':product_name', $data['product_name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':stock_quantity', $data['stock_quantity']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':image_url', $data['image_url']);

        if ($stmt->execute()) {
            $productId = $this->conn->lastInsertId();
            $product = $this->getProduct($productId);

            $this->sendResponse([
                'message' => 'Product created successfully',
                'product' => $product->getProductDetails(),
            ], 201);
        } else {
            $this->sendError('Failed to create product');
        }
    }

    public function getAllProducts(): void {
        $query = 'SELECT p.*, c.category_name, sc.sub_category_name
            FROM ' . Product::getTableName() . ' p
            JOIN ' . Category::getTableName() . ' c ON p.category_id = c.category_id
            JOIN ' . SubCategory::getTableName() . ' sc ON p.sub_category_id = sc.sub_category_id';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sendResponse($products);
    }

    public function getProduct(int $id, bool $send = false): ?Product {
        $query = 'SELECT p.*, c.category_name, sc.sub_category_name
            FROM ' . Product::getTableName() . ' p
            JOIN ' . Category::getTableName() . ' c ON p.category_id = c.category_id
            JOIN ' . SubCategory::getTableName() . ' sc ON p.sub_category_id = sc.sub_category_id
            WHERE p.product_id = :product_id';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':product_id', $id);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($send) {
            if ($product) {
                $this->sendResponse($product);
            } else {
                $this->sendError('Product not found', 404);
            }
        }

        return new Product($product);
    }

    public function updateProduct(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . Product::getTableName() . ' SET category_id = :category_id, sub_category_id = :sub_category_id, brand_id = :brand_id, product_name = :product_name, price = :price, stock_quantity = :stock_quantity, description = :description, image_url = :image_url WHERE product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $data['category_id']);
        $stmt->bindParam(':sub_category_id', $data['sub_category_id']);
        $stmt->bindParam(':brand_id', $data['brand_id']);
        $stmt->bindParam(':product_name', $data['product_name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':stock_quantity', $data['stock_quantity']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':image_url', $data['image_url']);
        $stmt->bindParam(':product_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Product updated successfully']);
        } else {
            $this->sendError('Failed to update product');
        }
    }

    public function deleteProduct(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['productId'];

        if (empty($id)) {
            $this->sendError('Product id is required');
        }

        $product = $this->getProduct($id);
        if (empty($product)) {
            $this->sendError('Product not found', 404);
        }

        $query = 'DELETE FROM ' . Product::getTableName() . ' WHERE product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':product_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Product deleted successfully']);
        } else {
            $this->sendError('Failed to delete product');
        }
    }

    public function searchProduct(string $searchQuery): void {
        $query = 'SELECT * FROM ' . Product::getTableName() . ' WHERE product_name LIKE :searchQuery';
        $stmt = $this->conn->prepare($query);
        $searchQuery = '%' . $searchQuery . '%';
        $stmt->bindParam(":searchQuery", $searchQuery);

        $results = [];
        if ($stmt->execute()) {
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        if (!empty($results)) {
            $this->sendResponse($results);
        }
    }

//    public function filterProducts(): void {
//        $filter_query = $_SERVER['QUERY_STRING'];
//        parse_str($filter_query, $data);
//
//        $query = 'SELECT p.*, c.category_name, sc.sub_category_name, b.brand_name
//              FROM ' . Product::getTableName() . ' p
//              JOIN ' . Category::getTableName() . ' c ON p.category_id = c.category_id
//              JOIN ' . SubCategory::getTableName() . ' sc ON p.sub_category_id = sc.sub_category_id
//              JOIN ' . Brand::getTableName() . ' b ON p.brand_id = b.brand_id
//              WHERE 1=1';
//
//        $params = [];
//
//        if (!empty($data['price_min'])) {
//            $query .= ' AND p.price >= :price_min';
//            $params[':price_min'] = $data['price_min'];
//        }
//
//        if (!empty($data['price_max'])) {
//            $query .= ' AND p.price <= :price_max';
//            $params[':price_max'] = $data['price_max'];
//        }
//
//        if (!empty($data['category_id'])) {
//            $category_ids = explode(',', $data['category_id']);
//            $placeholders = implode(',', array_fill(0, count($category_ids), '?'));
//            $query .= ' AND p.category_id IN (' . $placeholders . ')';
//            $params = array_merge($params, $category_ids);
//        }
//
//        if (!empty($data['sub_category_id'])) {
//            $sub_category_ids = explode(',', $data['sub_category_id']);
//            $placeholders = implode(',', array_fill(0, count($sub_category_ids), '?'));
//            $query .= ' AND p.sub_category_id IN (' . $placeholders . ')';
//            $params = array_merge($params, $sub_category_ids);
//        }
//
//        if (!empty($data['brand_id'])) {
//            $brand_ids = explode(',', $data['brand_id']);
//            $placeholders = implode(',', array_fill(0, count($brand_ids), '?'));
//            $query .= ' AND p.brand_id IN (' . $placeholders . ')';
//            $params = array_merge($params, $brand_ids);
//        }
//
//        $stmt = $this->conn->prepare($query);
//
//        foreach ($params as $index => $value) {
//            $stmt->bindValue($index + 1, $value);
//        }
//
//        $stmt->execute();
//        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
//
//        $this->sendResponse($products);
//    }

    public function filterProducts(): void {
        $filter_query = $_SERVER['QUERY_STRING'];
        parse_str($filter_query, $data);

        $query = 'SELECT p.*, c.category_name, sc.sub_category_name, b.brand_name
              FROM ' . Product::getTableName() . ' p
              JOIN ' . Category::getTableName() . ' c ON p.category_id = c.category_id
              JOIN ' . SubCategory::getTableName() . ' sc ON p.sub_category_id = sc.sub_category_id
              JOIN ' . Brand::getTableName() . ' b ON p.brand_id = b.brand_id
              WHERE 1=1';

        $params = [];
        $conditions = [];

        if (!empty($data['price_min'])) {
            $query .= ' AND p.price >= ?';
            $params[] = $data['price_min'];
        }

        if (!empty($data['price_max'])) {
            $query .= ' AND p.price <= ?';
            $params[] = $data['price_max'];
        }

        if (!empty($data['category_id'])) {
            $category_ids = explode(',', $data['category_id']);
            $placeholders = implode(',', array_fill(0, count($category_ids), '?'));
            $conditions[] = 'p.category_id IN (' . $placeholders . ')';
            $params = array_merge($params, $category_ids);
        }

        if (!empty($data['sub_category_id'])) {
            $sub_category_ids = explode(',', $data['sub_category_id']);
            $placeholders = implode(',', array_fill(0, count($sub_category_ids), '?'));
            $conditions[] = 'p.sub_category_id IN (' . $placeholders . ')';
            $params = array_merge($params, $sub_category_ids);
        }

        if (!empty($data['brand_id'])) {
            $brand_ids = explode(',', $data['brand_id']);
            $placeholders = implode(',', array_fill(0, count($brand_ids), '?'));
            $conditions[] = 'p.brand_id IN (' . $placeholders . ')';
            $params = array_merge($params, $brand_ids);
        }

        if (!empty($conditions)) {
            $query .= ' AND (' . implode(' OR ', $conditions) . ')';
        }

        $stmt = $this->conn->prepare($query);

        foreach ($params as $index => $value) {
            $stmt->bindValue($index + 1, $value);
        }

        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $this->sendResponse($products);
    }
}

?>
