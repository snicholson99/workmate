import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

import './style.css';
 
const MyClock = (props) => {
  const { type } = props;
  const [value, setValue] = useState(new Date());
 
  useEffect(() => {
    const interval = setInterval(
      () => setValue(new Date()),
      1000
    );
 
    return () => {
      clearInterval(interval);
    }
  }, []);

  const checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  if (type === "analog") {
    // return <Clock value={value} size={90} renderSecondHand={false} />;
    return <Clock value={value} size={60} renderSecondHand={false} />;
  }
  return (
    <h4 id="digital-clock">
      {checkTime(value.getHours())}:{checkTime(value.getMinutes())}
    </h4>
  );
 
  
}

export default MyClock;