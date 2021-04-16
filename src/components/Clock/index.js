import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

import './index.css';
 
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
    return <Clock value={value} size={70} renderSecondHand={false} />;
  }
  return (
    <Typography id="digital-clock" variant="h4">
      {checkTime(value.getHours())}:{checkTime(value.getMinutes())}
    </Typography>
  );
 
  
}

export default MyClock;