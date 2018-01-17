#!/usr/bin/env python
"""
	Recipe Ready
	Raspberry Pi Data Forwarding Programme
	Author : Rocky Petkov

	This programme reads data comming in over the serial input and then 
	forwards it to the Recipe Ready webserver for actual processing of the 
	data
"""

import serial
import requests

baud_rate = 9600	# A bit of a magic number, I know!
kitchen_id = 1;		# Normally wouldn't be hard coded!
cloud_url = "http://criwcomputing.com/kitchen/sensors/update"
log_file = open("/home/pi/log", 'w')

# Because I am a heathen and use ints for boolean values
def fast_boolean_convert(boolean_int):
	if (boolean_int == "0"):
		return "false"
	else:
		return "true"

# Handles the forwarding of the data to the cloud!
def forward_to_cloud(data):
	log_file.write("Forwarding data to the cloud\n")
	print(len(data))
	print(data[0:3])
	for sensor in range(len(data)):
		parametres = {"kitchenID": str(kitchen_id), "sensor": str(sensor), "update": fast_boolean_convert(data[sensor])}
		log_file.write("Sending Request to:" + cloud_url + "\n" + "Parametres: " + str(parametres) + "\n")
		response = requests.post(cloud_url, json = parametres)
		log_file.write("Response: " + str(response) + "\n\n")
		log_file.write("Result: " + str(response.status_code) + "\n")


# Little main function which just loops around.
def main():
	log_file.write("Beginning Data Forwarding Log:\n\n")
	# Let's define two lists for storing data
	# Am I really getting data this fast
	new_data = ""
	old_data = ""

	log_file.write("Opening a serial connexion on /dev/ttyAMA0\n")
	port = serial.Serial("/dev/ttyACM0", baud_rate, timeout = .75)

	# To heck with it... we'll poll for input
	while True:
		log_file.write("Reading Data\n")
		new_data = str(port.readline())		# This should have us recieve all data. Make sure of it
		new_data = new_data[0:3]		# For some reason an extra two spaces are appended to end...
		log_file.write("New Data is now: \n" + new_data + "\n\n")
		log_file.write("Old Data is now\n" + old_data + "\n\n")

		if (new_data != old_data and new_data != ""):
			forward_to_cloud(new_data)
			old_data = new_data             # Our data is now old

main()