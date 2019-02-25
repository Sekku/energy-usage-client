import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 15px auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  color: #6c6c6c;
  .disabled & {
    color: #d1d1d1;
  }
`;

const Box = styled.div`
  display: inline-block;
  vertical-align: top;
  min-height: 110px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  background: #ffffff;
  transition: 0.4s ease;
  margin-right: 10px;
  &:last-child {
    margin: 0;
  }
  &:hover {
    border-color: #ebebeb;
  }
  .invalid & {
    border-color: #ff3939;
  }
`;

const Input = styled.input`
  height: 100%;
  text-align: left;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: none;
  font-size: 22px;
  font-family: Roboto, sans-serif;
  color: #333333;
  .valid & {
    color: #333333;
  }
  .invalid & {
    color: #ff3939;
  }
  ::placeholder {
    color: #d1d1d1;
    opacity: 1;
  }
  .disabled & {
    color: #d1d1d1;
  }
`;

const Hint = styled.span`
  margin-top: 15px;
  display: block;
  color: #333333;
  font-size: 12px;
  margin-bottom: 5px;
  line-height: 15px;
`;

const Button = styled.button`
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 3px;
  margin: 0;
  padding: 0;
  height: 45px;
  line-height: 45px;
  width: 200px;
  display: block;

  font-size: 16px;
  color: #ffffff;
  background-color: #333333;
  transition: background-color 0.4s ease, color 0.4s ease;
  &.disabled {
    color: #d1d1d1;
    background-color: #ebebeb;
    cursor: not-allowed;
  }
  &:hover:not(.disabled) {
    color: #ffffff;
    background-color: #333333;
  }
`;

const ErrorMessage = styled.p`
  text-align: left;
  color: #ff3939;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default {
  Container,
  Label,
  Input,
  Button,
  ErrorMessage,
  Box,
  Hint
};
