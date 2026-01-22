package com.terrarent.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.terrarent.backend.dto.PropertyDto;
import com.terrarent.backend.entity.Property;
import com.terrarent.backend.entity.User;
import com.terrarent.backend.repository.PropertyRepository;
import com.terrarent.backend.repository.UserRepository;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public List<PropertyDto> getAllProperties() {
        return propertyRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<PropertyDto> getPropertyById(Long id) {
        return propertyRepository.findById(id).map(this::convertToDto);
    }

    public List<PropertyDto> getPropertiesByLandlord(Long landlordId) {
        Optional<User> landlord = userRepository.findById(landlordId);
        if (landlord.isPresent()) {
            return propertyRepository.findByLandlord(landlord.get()).stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    public List<PropertyDto> getAvailableProperties() {
        return propertyRepository.findByAvailable(true).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PropertyDto createProperty(PropertyDto propertyDto) {
        Property property = convertToEntity(propertyDto);
        Property savedProperty = propertyRepository.save(property);
        return convertToDto(savedProperty);
    }

    public PropertyDto updateProperty(Long id, PropertyDto propertyDto) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);
        if (optionalProperty.isPresent()) {
            Property property = optionalProperty.get();
            // Update fields
            property.setTitle(propertyDto.getTitle());
            property.setDescription(propertyDto.getDescription());
            property.setAddress(propertyDto.getAddress());
            property.setCity(propertyDto.getCity());
            property.setState(propertyDto.getState());
            property.setZipCode(propertyDto.getZipCode());
            property.setPrice(propertyDto.getPrice());
            property.setBedrooms(propertyDto.getBedrooms());
            property.setBathrooms(propertyDto.getBathrooms());
            property.setArea(propertyDto.getArea());
            property.setType(propertyDto.getType());
            property.setAvailable(propertyDto.isAvailable());
            property.setImageUrl(propertyDto.getImageUrl());
            Property updatedProperty = propertyRepository.save(property);
            return convertToDto(updatedProperty);
        }
        return null;
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    private PropertyDto convertToDto(Property property) {
        PropertyDto dto = new PropertyDto();
        dto.setId(property.getId());
        dto.setTitle(property.getTitle());
        dto.setDescription(property.getDescription());
        dto.setAddress(property.getAddress());
        dto.setCity(property.getCity());
        dto.setState(property.getState());
        dto.setZipCode(property.getZipCode());
        dto.setPrice(property.getPrice());
        dto.setBedrooms(property.getBedrooms());
        dto.setBathrooms(property.getBathrooms());
        dto.setArea(property.getArea());
        dto.setType(property.getType());
        dto.setAvailable(property.isAvailable());
        dto.setImageUrl(property.getImageUrl());
        dto.setLandlordId(property.getLandlord().getId());
        dto.setLandlordName(property.getLandlord().getFirstName() + " " + property.getLandlord().getLastName());
        dto.setAmenities(property.getAmenities().stream().map(a -> a.getName()).collect(Collectors.toSet()));
        dto.setCreatedAt(property.getCreatedAt());
        return dto;
    }

    private Property convertToEntity(PropertyDto propertyDto) {
        Property property = new Property();
        property.setTitle(propertyDto.getTitle());
        property.setDescription(propertyDto.getDescription());
        property.setAddress(propertyDto.getAddress());
        property.setCity(propertyDto.getCity());
        property.setState(propertyDto.getState());
        property.setZipCode(propertyDto.getZipCode());
        property.setPrice(propertyDto.getPrice());
        property.setBedrooms(propertyDto.getBedrooms());
        property.setBathrooms(propertyDto.getBathrooms());
        property.setArea(propertyDto.getArea());
        property.setType(propertyDto.getType());
        property.setAvailable(propertyDto.isAvailable());
        property.setImageUrl(propertyDto.getImageUrl());
        // Set landlord
        Optional<User> landlord = userRepository.findById(propertyDto.getLandlordId());
        landlord.ifPresent(property::setLandlord);
        return property;
    }
}