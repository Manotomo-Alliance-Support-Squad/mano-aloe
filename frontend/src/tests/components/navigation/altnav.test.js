import React from 'react';
import routeData from 'react-router';
import AltNav from "../../../components/navigation/altnav";

const mockLocation = {
    pathname: '/welcome',
    hash: '',
    search: '',
    state: ''
};

beforeEach(() => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)
});

test('span for non-home pages', () => {
    expect(AltNav()).toStrictEqual(<span />);
});
