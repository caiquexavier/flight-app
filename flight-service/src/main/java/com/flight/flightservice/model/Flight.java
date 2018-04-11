package com.flight.flightservice.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Data
@Document
@RequiredArgsConstructor
public class Flight {

    private @Id UUID id = UUID.randomUUID();
    private final Integer flightCode;
    private final LocalDateTime departureDateTime;
    private final LocalDateTime arrivalDateTime;
    private final Airplane airplane;
    private final Pilot pilot;
}
