package com.terrarent.backend.dto;

import com.terrarent.backend.entity.PropertyType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public class PropertyDto {

    private Long id;
    private String title;
    private String description;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private BigDecimal price;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer area;
    private PropertyType type;
    private boolean available;
    private String imageUrl;
    private Long landlordId;
    private String landlordName;
    private Set<String> amenities;
    private LocalDateTime createdAt;

    // Constructors

    public PropertyDto() {}

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }

    public Integer getBathrooms() { return bathrooms; }
    public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }

    public Integer getArea() { return area; }
    public void setArea(Integer area) { this.area = area; }

    public PropertyType getType() { return type; }
    public void setType(PropertyType type) { this.type = type; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getLandlordId() { return landlordId; }
    public void setLandlordId(Long landlordId) { this.landlordId = landlordId; }

    public String getLandlordName() { return landlordName; }
    public void setLandlordName(String landlordName) { this.landlordName = landlordName; }

    public Set<String> getAmenities() { return amenities; }
    public void setAmenities(Set<String> amenities) { this.amenities = amenities; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}