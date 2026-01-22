package com.terrarent.backend.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    @ManyToMany(mappedBy = "amenities")
    private Set<Property> properties;

    // Constructors, getters, setters

    public Amenity() {}

    public Amenity(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Set<Property> getProperties() { return properties; }
    public void setProperties(Set<Property> properties) { this.properties = properties; }
}