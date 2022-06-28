import { useState, useCallback } from "react";

export default function UseInput(initValue = null) {
  const [value, setValue] = useState(initValue);

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return [value, onChange];
}
