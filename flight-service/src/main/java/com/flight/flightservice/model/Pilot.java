package com.flight.flightservice.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.UUID;

@Data
@Document
@RequiredArgsConstructor
public class Pilot {

    private @Id UUID id = UUID.randomUUID();
    private String pilotName;
    private String pilotDocument;

}