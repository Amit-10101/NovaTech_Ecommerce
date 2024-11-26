<?php
class Brand {

    private const TABLE = 'brands';

    private int $brand_id;
    private string $brand_name;
    private string $created_at;

    // Constructor
    public function __construct(array $data) {
        $this->brand_id = $data['brand_id'];
        $this->brand_name = $data['brand_name'];
        $this->created_at = $data['created_at'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getBrandDetails(): array {
        return [
            'brand_id' => $this->getBrandId(),
            'brand_name' => $this->getBrandName(),
            'created_at' => $this->getCreatedAt(),
        ];
    }

    // Getters and Setters
    public function getBrandId(): int {
        return $this->brand_id;
    }

    public function getBrandName(): string {
        return $this->brand_name;
    }

    public function setBrandName(string $brand_name): void {
        $this->brand_name = $brand_name;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}
?>