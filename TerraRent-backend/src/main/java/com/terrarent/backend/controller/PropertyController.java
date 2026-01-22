package com.terrarent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terrarent.backend.dto.PropertyDto;
import com.terrarent.backend.service.PropertyService;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public ResponseEntity<List<PropertyDto>> getAllProperties() {
        List<PropertyDto> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDto> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/landlord/{landlordId}")
    public ResponseEntity<List<PropertyDto>> getPropertiesByLandlord(@PathVariable Long landlordId) {
        List<PropertyDto> properties = propertyService.getPropertiesByLandlord(landlordId);
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/available")
    public ResponseEntity<List<PropertyDto>> getAvailableProperties() {
        List<PropertyDto> properties = propertyService.getAvailableProperties();
        return ResponseEntity.ok(properties);
    }

    @PostMapping
    public ResponseEntity<PropertyDto> createProperty(@RequestBody PropertyDto propertyDto) {
        PropertyDto createdProperty = propertyService.createProperty(propertyDto);
        return ResponseEntity.ok(createdProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyDto> updateProperty(@PathVariable Long id, @RequestBody PropertyDto propertyDto) {
        PropertyDto updatedProperty = propertyService.updateProperty(id, propertyDto);
        if (updatedProperty != null) {
            return ResponseEntity.ok(updatedProperty);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}