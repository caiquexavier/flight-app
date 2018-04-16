package com.flight.flightservice.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.Calendar;
import java.util.UUID;

@Document
@Data
@RequiredArgsConstructor
public class Flight {

    private @Id
    UUID id = UUID.randomUUID();
    private final String flightCode;
    private final Calendar departureDateTime;
    private final Calendar arrivalDateTime;
    private final String status;
    private final Airplane airplane;
    private final Pilot pilot;

    @Data
    @RequiredArgsConstructor
    public static class Pilot {

        private @Id UUID id = UUID.randomUUID();
        private final String pilotName;
        private final String pilotDocument;

    }

    @Data
    @RequiredArgsConstructor
    public static class Airplane {

        private @Id UUID id = UUID.randomUUID();
        private final String airplaneModel;
        private final String airplaneCode;

    }

}