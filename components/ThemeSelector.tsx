import * as React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeSelector: React.FC = () => {
  return (
    <label className="swap swap-rotate">
      <input type="checkbox" />
      <BsFillSunFill className="swap-off" />
      <BsFillMoonFill className="swap-on" />
    </label>
  );
};

export default ThemeSelector;
