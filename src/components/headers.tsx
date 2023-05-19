import React, { useState } from 'react';
import { Appbar, Portal, Text, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Image } from 'react-native';

const PaperHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export const MoreHeader = ({navigation, options, route, back}: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header style={{height:200, justifyContent:'center'}}>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            {/* <Appbar.Content title={title} /> */}
            <Image source={{uri:'http://3.bp.blogspot.com/-EhrA8cHwXnQ/TyCtHjs957I/AAAAAAAAAeg/QJfY0lg1x34/s1600/1019i.gif'}} style={{width: 300, height: 200, alignSelf:'center'}} />
        </Appbar.Header>
    );
};

export default PaperHeader;