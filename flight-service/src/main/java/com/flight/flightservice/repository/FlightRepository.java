package com.flight.flightservice.repository;

import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import com.flight.flightservice.model.Flight;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.format.annotation.DateTimeFormat;

public interface FlightRepository extends MongoRepository<Flight, UUID> {


    @RestResource(path = "byFlightCode")
    Collection<Flight> findByFlightCodeIgnoreCaseContaining(@Param("flightCode") String flightCode);

    @RestResource(path = "byStatus")
    Collection<Flight> findByStatusIgnoreCaseContaining(@Param("status") String status);

    @RestResource(path = "byQueryResults")
    @Query("{ 'flightCode': {$regex:?0,$options:'i'} , 'status': {$regex:?1,$options:'i'}, 'departureDateTime': {$gte:?2,$lte:?3} }")
    List<Flight> findQueryResultsIgnoreCaseContaining(@Param("flightCode") String flightCode,
                                                      @Param("status") String status,
                                                      @Param("initialDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Calendar initialDate,
                                                      @Param("finalDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Calendar finalDate);

}