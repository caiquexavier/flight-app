package com.flight.flightservice;

import com.flight.flightservice.model.Airplane;
import com.flight.flightservice.model.Flight;
import com.flight.flightservice.model.Pilot;
import com.flight.flightservice.repository.FlightRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Calendar;
import java.util.GregorianCalendar;


@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class FlightServiceApplicationTests {

	@Autowired
	FlightRepository flightRepository;

	@Test
	public void orderTest() {

		flightRepository.deleteAll();

		Calendar departure = new GregorianCalendar(2018, 1, 15, 16, 00, 00);
		Calendar arrival = new GregorianCalendar(2018, 1, 15, 20, 30, 00);

		Airplane airplane = new Airplane();
		airplane.setAirplaneCode("EXCVT67TY");
		airplane.setAirplaneModel("BOEING 777");

		Pilot pilot = new Pilot();
		pilot.setPilotName("Caique");
		pilot.setPilotDocument("AIRBR39771673831");

		flightRepository.save(new Flight("AAX7431", departure, arrival, airplane, pilot));

		Integer resultContAll = 0;
		for (Flight flight : flightRepository.findAll()) {
			resultContAll++;
		}
		Assert.assertEquals(resultContAll, new Integer(1));
	}


}
