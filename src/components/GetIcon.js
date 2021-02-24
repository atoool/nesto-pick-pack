import React from 'react';
import {
  DoneSVG,
  TickSVG,
  Success1SVG,
  Success2SVG,
  RightArrowSVG,
  RightCaretSVG,
  RepickSVG,
  PickSVG,
  PackScanSVG,
  NotificationSVG,
  NoOrdersSVG,
  MarkAvailabilitySVG,
  BinAssignSVG,
  CartSVG,
  EditSVG,
  LockSVG,
  NoNotificationSVG,
  ProfileSVG,
  UserSVG,
  PickerChoiceSVG,
  NoResponseSVG,
  SuccessSubstituteSVG,
  ItemRemovedSVG,
  CustAvailableSVG,
  DropSVG,
} from '../assets/svg';

const GetIcon = ({ name, color, width }) => {
  if (name === 'PackNow') {
    return <PickSVG color={color} width={width} />;
  } else if (name === 'Notifications') {
    return <NotificationSVG color={color} width={width} />;
  } else if (name === 'AssignBin') {
    return <BinAssignSVG color={color} width={width} />;
  } else if (name === 'Profile') {
    return <ProfileSVG color={color} width={width} />;
  } else if (name === 'UserSVG') {
    return <UserSVG color={color} width={width} />;
  } else if (name === 'LockSVG') {
    return <LockSVG color={color} width={width} />;
  } else if (name === 'EditSVG') {
    return <EditSVG color={color} width={width} />;
  } else if (name === 'CartSVG') {
    return <CartSVG color={color} width={width} />;
  } else if (name === 'MarkAvailabilitySVG') {
    return <MarkAvailabilitySVG color={color} width={width} />;
  } else if (name === 'NoOrdersSVG') {
    return <NoOrdersSVG color={color} width={width} />;
  } else if (name === 'PackScanSVG') {
    return <PackScanSVG color={color} width={width} />;
  } else if (name === 'RepickSVG') {
    return <RepickSVG color={color} width={width} />;
  } else if (name === 'RightCaretSVG') {
    return <RightCaretSVG color={color} width={width} />;
  } else if (name === 'RightArrowSVG') {
    return <RightArrowSVG color={color} width={width} />;
  } else if (name === 'Success2SVG') {
    return <Success2SVG color={color} width={width} />;
  } else if (name === 'DoneSVG') {
    return <DoneSVG color={color} width={width} />;
  } else if (name === 'TickSVG') {
    return <TickSVG color={color} width={width} />;
  } else if (name === 'Success1SVG') {
    return <Success1SVG color={color} width={width} />;
  } else if (name === 'NoNotificationSVG') {
    return <NoNotificationSVG color={color} width={width} />;
  } else if (name === 'CustAvailableSVG') {
    return <CustAvailableSVG color={color} width={width} />;
  } else if (name === 'SuccessSubstituteSVG') {
    return <SuccessSubstituteSVG color={color} width={width} />;
  } else if (name === 'PickerChoiceSVG') {
    return <PickerChoiceSVG color={color} width={width} />;
  } else if (name === 'NoResponseSVG') {
    return <NoResponseSVG color={color} width={width} />;
  } else if (name === 'ItemRemovedSVG') {
    return <ItemRemovedSVG color={color} width={width} />;
  } else if (name === 'DropSVG') {
    return <DropSVG color={color} width={width} />;
  }
};

export default GetIcon;
