import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const setTheme = (value:string) => {
  localStorage.setItem('theme',value);
  window.location.reload();
}

function ThemePicker({selected}:{selected:string}) {
  const [value,setValue] = useState<string>(selected);
  return (
    <DropdownButton id="dropdown-basic-button" title="Temayı Değiştir" variant='light'>
      <Dropdown.Item onClick={() => setTheme("vapor")}>Vapor</Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme("darkly")}>Darkly</Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme("sketchy")}>Sketchy</Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme("simplex")}>Simplex</Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme("quartz")}>Quartz</Dropdown.Item>
    </DropdownButton>
  );
}


export default ThemePicker;