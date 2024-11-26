<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Brand.php';
require_once __DIR__ . '/../config/Database.php';

class BrandController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function createBrand(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Brand::getTableName() . ' (brand_name) VALUES (:brand_name)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':brand_name', $data['brand_name']);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Brand created successfully']);
        } else {
            $this->sendError('Failed to create brand');
        }
    }

    public function getAllBrands(): void {
        $query = 'SELECT * FROM ' . Brand::getTableName();
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $brands = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sendResponse($brands);
    }

    public function getBrand(int $id, bool $send = false): ?Brand {
        $query = 'SELECT * FROM ' . Brand::getTableName() . ' WHERE brand_id = :brand_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':brand_id', $id);
        $stmt->execute();
        $brand = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($send) {
            $this->sendResponse($brand);
        }

        return new Brand($brand);
    }

    public function getBrandByName(string $name): ?Brand {
        $query = 'SELECT * FROM ' . Brand::getTableName() . ' WHERE brand_name = :brand_name';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':brand_name', $name);
        $stmt->execute();
        $brand = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($brand) {
            return new Brand($brand);
        }

        return null;
    }

    public function updateBrand(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . Brand::getTableName() . ' SET brand_name = :brand_name WHERE brand_id = :brand_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':brand_name', $data['brand_name']);
        $stmt->bindParam(':brand_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Brand updated successfully']);
        } else {
            $this->sendError('Failed to update brand');
        }
    }

    public function deleteBrand(int $id): void {
        $query = 'DELETE FROM ' . Brand::getTableName() . ' WHERE brand_id = :brand_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':brand_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Brand deleted successfully']);
        } else {
            $this->sendError('Failed to delete brand');
        }
    }
}
?>