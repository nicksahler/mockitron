// These values may be different for your servo
const SERVO_MIN = 0.03;
const SERVO_MAX = 0.1;
 
const LOCKED = 1;
const UNLOCKED = 0;
 
servo <- hardware.pin7;
servo.configure(PWM_OUT, 0.02, SERVO_MIN);
 
function setServo(value) {
  local scaledValue = value * (SERVO_MAX-SERVO_MIN) + SERVO_MIN;
  servo.write(scaledValue);
}
 
function setServoDegrees(value) {
  local scaledValue = (value + 81) / 161.0 * (SERVO_MAX-SERVO_MIN) + SERVO_MIN;
  servo.write(scaledValue);
}

function unlock() {
  setServo(UNLOCKED);
}

function lock() {
  // Only if door is closed. To add later.
  if (true) {
    setServo(LOCKED)
  } else {
    // get mad
  }
}

agent.on("state", function(data) {
  if (data == "unlock") {
    unlock();
    imp.wakeup(5.0, lock);
  } else if (data == "lock") {
    lock();
  }
});