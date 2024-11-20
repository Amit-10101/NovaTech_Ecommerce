<?php

class SubCategory {
    private const TABLE = 'sub_categories';

    private int $sub_category_id;
    private string $sub_category_name;
    private int $category_id;
    private string $created_at;

    // Constructor
    public function __construct(array $data) {
        $this->sub_category_id = $data['sub_category_id'];
        $this->sub_category_name = $data['sub_category_name'];
        $this->category_id = $data['category_id'];
        $this->created_at = $data['created_at'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getSubCategoryDetails(): array {
        return [
            'sub_category_id' => $this->getSubCategoryId(),
            'sub_category_name' => $this->getSubCategoryName(),
            'category_id' => $this->getCategoryId(),
            'created_at' => $this->getCreatedAt(),
        ];
    }

    // Getters and Setters
    public function getSubCategoryId(): int {
        return $this->sub_category_id;
    }

    public function getSubCategoryName(): string {
        return $this->sub_category_name;
    }

    public function setSubCategoryName(string $sub_category_name): void {
        $this->sub_category_name = $sub_category_name;
    }

    public function getCategoryId(): int {
        return $this->category_id;
    }

    public function setCategoryId(int $category_id): void {
        $this->category_id = $category_id;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>