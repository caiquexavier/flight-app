package com.flight.flightservice.repository;

import java.util.Collection;
import java.util.UUID;

import com.flight.flightservice.model.Flight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface FlightRepository extends CrudRepository<Flight, UUID> {

    @RestResource(path = "byFlightCode")
    Collection<Flight> findByFlightCode(@Param("flightCode") Integer flightCode);


}