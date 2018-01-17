/* FSR simple testing sketch. 
 
Connect one end of FSR to power, the other end to Analog 0.
Then connect one end of a 10K resistor from Analog 0 to ground 
 
For more information see www.ladyada.net/learn/sensors/fsr.html */

const int pinNum = 3;

int fsrPin[pinNum];     // the FSR and 10K pulldown are connected to a0
  
int fsrReading[pinNum];     // the analog reading from the FSR resistor divider

byte sensor[pinNum];   //saves previous value

int bytesWritten;     // Allows us to do debugging if we need it

String sensorValue;   // A string with our sensor values. Allows for easier interpretation on the python end

 
void setup(void) {
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600);  

  for (int i = 0; i < pinNum; i++){
    fsrPin[i] = i;
    sensor[i] = 0;
  }
}


void loop(void) {
  
  // Obtain the raw analogue resading
  for (int thisPin = 0; thisPin < pinNum; thisPin++){
    fsrReading[thisPin] = analogRead(fsrPin[thisPin]);
  }

  //Check for changes in pressure
  bool change = false;
  sensorValue = "";

  for (int i = 0; i < pinNum; i++){
    if (fsrReading[i] < 10) {
        sensorValue.concat(0);
    } else {
        sensorValue.concat(1);
    }
  }

// Send to the pi
Serial.println(sensorValue);

  delay(1000);
}

// Turns our sesnor values into a string!

