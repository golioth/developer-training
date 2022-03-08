---
sidebar_position: 5
---

# CircuitPython Demo First Steps

Now that you have code and credentials on your device from the previous step, it's time to put this to use. Remember, this stage of the training is to showcase the various ways to send data to the Golioth cloud. 

## LightDB State vs Stream: A brief overview

"LightDB" is a generic term we use for the database capabilities on the Golioth cloud. The two functionalities and use cases are somewhat different:
* **State**
  * A database that tracks the current status of particular variables. 
  * No time-stamping
  * Often used for "command and control"
  * If the status for "LED0" can be true or false, we can set up the local device to change it or for the cloud to change it
  * Variables can be changed via the REST API
* **Stream**
  * A time-series database for tracking variables that are expected to change
  * Almost always uni-directional going from the device up to the cloud
  * Often these are sensor readings 
  * Works well with charting capabilities on external platforms

## Push a button, hear a beep

This is a very simple demo. Press one of the buttons on the bottom of the board (D11, D12, D14, D15). You will hear a tone and see the NeoPixels (LEDs at the top of the board) light up a different color. Fun!

## Make a change

Using VS Code, Mu Editor, or another safe editor, change something in `code.py`, like some of the suggestions below. Then click save. What happens?
* Change the tone of assigned to a button
* Change the color of the LED
* Change one of the messages going to the screen
* Change one of the messages going to the console
