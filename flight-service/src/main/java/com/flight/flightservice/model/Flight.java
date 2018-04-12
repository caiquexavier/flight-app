package com.flight.flightservice.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;

@Data
@Document
@RequiredArgsConstructor
public class Flight {

    private @Id UUID id = UUID.randomUUID();
    private final String flightCode;
    private final Calendar departureDateTime;
    private final Calendar arrivalDateTime;
    private final Airplane airplane;
    private final Pilot pilot;
}
