<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/SubCategory.php';
require_once __DIR__ . '/../config/Database.php';

class SubCategoryController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function createSubCategory(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . SubCategory::getTableName() . ' (sub_category_name) VALUES (:sub_category_name)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':sub_category_name', $data['sub_category_name']);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'SubCategory created successfully']);
        } else {
            $this->sendError('Failed to create subcategory');
        }
    }

    public function getAllSubCategories(): void {
        $query = 'SELECT * FROM ' . SubCategory::getTableName();
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $subCategories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sendResponse($subCategories);
    }

    public function getSubCategory(int $id, bool $send = false): ?SubCategory {
        $query = 'SELECT * FROM ' . SubCategory::getTableName() . ' WHERE sub_category_id = :sub_category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':sub_category_id', $id);
        $stmt->execute();
        $subCategory = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($send) {
            $this->sendResponse($subCategory);
        }

        return new SubCategory($subCategory);
    }

    public function getSubCategoryByName(string $name): ?SubCategory {
        $query = 'SELECT * FROM ' . SubCategory::getTableName() . ' WHERE sub_category_name = :sub_category_name';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':sub_category_name', $name);
        $stmt->execute();
        $subCategory = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($subCategory) {
            return new SubCategory($subCategory);
        }

        return null;
    }

    public function updateSubCategory(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . SubCategory::getTableName() . ' SET sub_category_name = :sub_category_name WHERE sub_category_id = :sub_category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':sub_category_name', $data['sub_category_name']);
        $stmt->bindParam(':sub_category_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'SubCategory updated successfully']);
        } else {
            $this->sendError('Failed to update subcategory');
        }
    }

    public function deleteSubCategory(int $id): void {
        $query = 'DELETE FROM ' . SubCategory::getTableName() . ' WHERE sub_category_id = :sub_category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':sub_category_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'SubCategory deleted successfully']);
        } else {
            $this->sendError('Failed to delete subcategory');
        }
    }
}
?>