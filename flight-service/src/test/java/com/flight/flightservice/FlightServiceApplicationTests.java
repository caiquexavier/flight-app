package com.flight.flightservice;

import com.flight.flightservice.model.Flight;
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
	public void flightTest() {

		flightRepository.deleteAll();

		Calendar departure = new GregorianCalendar(2018, 1, 15, 16, 00, 00);
		Calendar arrival = new GregorianCalendar(2018, 1, 15, 20, 30, 00);

		Flight flight = new Flight("AAX7431", departure, arrival, "NOW BORADING",
				new Flight.Airplane("BOEING 777", "PLN123"),
				new Flight.Pilot("Caique", "RG123456"));

		flightRepository.save(flight);

		Integer resultContAll = 0;
		for (Flight flightResponse : flightRepository.findAll()) {
			resultContAll++;
		}
		Assert.assertEquals(resultContAll, new Integer(1));
	}


}
