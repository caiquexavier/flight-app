package com.flight.flightservice.handler;

import com.flight.flightservice.model.Event;
import com.flight.flightservice.model.Flight;
import com.flight.flightservice.utils.EventDispatcher;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RepositoryEventHandler(Flight.class)
public class FlightEventHandler {

	private final EventDispatcher eventDispatcher;
	private final Gson gson;

	@Autowired
	public FlightEventHandler(EventDispatcher eventDispatcher, Gson gson) {
		this.eventDispatcher = eventDispatcher;
		this.gson = gson;

	}

	@HandleAfterCreate
	public void handleFlightCreate(Flight c) throws Exception {
		log.info("handleOrderCreate: {}", c.getId());
		eventDispatcher.emmitEvent(new Event( "flight.created", gson.toJson(c) ));
	}

	@HandleAfterSave
	public void handleFlightSave(Flight c) throws Exception {
		log.info("handleOrderSave: {}", c.getId());
		eventDispatcher.emmitEvent(new Event( "flight.updated", gson.toJson(c) ));
	}

	@HandleAfterDelete
	public void handleFlightDelete(Flight c) throws Exception {
		log.info("handleOrderDelete: {}", c.getId());
		eventDispatcher.emmitEvent(new Event( "flight.deleted", gson.toJson(c) ));
	}
}
