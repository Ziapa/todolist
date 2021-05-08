import React from 'react';

import {ButtonProps} from './Button';
// @ts-ignore
import {Meta, Story} from "@storybook/react/types-6-0";
import {AddItemForm} from "../AddItemForm";

export default {
  title: 'Example/AddItemForm',
  component: AddItemForm
} as Meta;

export const Template: Story<ButtonProps> = () => <AddItemForm addItem={()=> {}}/>