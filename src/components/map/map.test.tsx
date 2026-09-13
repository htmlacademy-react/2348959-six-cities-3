import {render} from '@testing-library/react';
import leaflet from 'leaflet';
import {makeFakeOffer} from '../../utils/test-mocks';
import Map from './map';

vi.mock('leaflet', () => {
  const markerLayer = {
    remove: vi.fn(),
  };

  return {
    default: {
      icon: vi.fn(() => ({})),
      map: vi.fn(() => ({
        remove: vi.fn(),
      })),
      tileLayer: vi.fn(() => ({
        addTo: vi.fn(),
      })),
      layerGroup: vi.fn(() => ({
        addTo: vi.fn(() => markerLayer),
      })),
      marker: vi.fn(() => ({
        addTo: vi.fn(),
      })),
    },
  };
});

describe('Map', () => {
  it('should render map container and create markers', () => {
    const firstOffer = makeFakeOffer('1');
    const secondOffer = makeFakeOffer('2');
    const offers = [firstOffer, secondOffer];

    const {container} = render(
      <Map
        city={firstOffer.city}
        offers={offers}
        selectedOfferId={secondOffer.id}
      />
    );

    expect(container.querySelector('.cities__map')).toBeInTheDocument();
    expect(leaflet.map).toHaveBeenCalled();
    expect(leaflet.marker).toHaveBeenCalledTimes(offers.length);
  });
});
