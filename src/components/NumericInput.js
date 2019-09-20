import _ from 'lodash';
import React from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const NumbericInput = ({ id, name, value, onChange }) => {
  const valid = _.isFinite(_.toNumber(value));
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText style={{ width: '200px' }} tag="label" htmlFor={id}>{name}</InputGroupText>
      </InputGroupAddon>
      <Input type="number" step="1" invalid={!valid} id={id} name={id} value={value} onChange={onChange} />
    </InputGroup>
  )
}

export default NumbericInput;
