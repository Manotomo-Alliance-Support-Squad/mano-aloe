import React from 'react';
import routeData from 'react-router';
import AltNav from "../../../components/navigation/altnav";
import { creditsNav } from "../../../components/navigation/altnav";
import InPageNav from '../../../components/inPageNav/inPageNav';

const mockNonHomeLocation = {
    pathname: '/welcome',
    hash: '',
    search: '',
    state: ''
};

const mockHomeLocation = {
    pathname: '/home',
    hash: '',
    search: '',
    state: ''
};

test('span for non-home pages', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockNonHomeLocation)
    expect(AltNav()).toStrictEqual(<span />);
});

test('span for homepage', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockHomeLocation)
    expect(AltNav()).toStrictEqual(<InPageNav navButtons={creditsNav} />);
});
