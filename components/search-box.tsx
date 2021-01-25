import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { useLocalStore, useObserver } from 'mobx-react';
import ModelCard from './models/card-search';
import { debounce } from 'throttle-debounce';

const SearchBox = (): JSX.Element => {
  const item = {
    'id': 1,
    'categoryId': 7,
    'date': 1571658529083,
    'name': 'Playstation One Slim',
    'slug': 'playstation-one-slim',
    'info': {
      'description': '<p>Lorem ipsum</p>',
      'hairFur': 'none',
      'morpher': false,
      'polys': '50000',
      'skinning': 'none',
      'textures': 'procedural',
      'verts': '25000'
    },
    'preview': 'BoomBox.glb',
    'tags': [
      'game console',
      'playstation',
      'sony'
    ],
    'links': {
      'model': [
        {
          'dcc': '3dsmax',
          'dccVersion': 2016,
          'link': '',
          'renderer': 'Redshift 2.6',
          'size': '1.00 MB'
        }
      ],
      'textures': null
    },
    'brand': [
      'Sony'
    ],
    'thumbnail': 'playstation-one-slim_thumb.jpeg',
    'images': [
      'playstation-one-slim_thumb.jpeg'
    ],
    'userImages': []
  };

  async function fetchSearchResults(): Promise<any> {
    const results = await Axios.get('https://reqres.in/api/users?page=2');
    console.log(results.data);
    state.changeVisibility(true);
  }

  const debouncedFetch = debounce(1000, false, async() => {
    await fetchSearchResults();
  });

  const state = useLocalStore(() => ({
    search: '',
    isResultsVisible: false,
    results: [
      item
    ],
    changeVisibility(value: boolean) {
      if (this.search.trim().length > 0 && this.results.length > 0) {
        this.isResultsVisible = value;
      } else {
        this.isResultsVisible = false;
      }
    },
    onInputSubmit(event: any) {
      this.search = event.target.value;
      if (this.search.trim().length > 0) {
        debouncedFetch();
      } else {
        this.isResultsVisible = false;
      }
    },
    onInputFocus() {
      this.changeVisibility(true);
    },
    onInputBlur() {
      this.isResultsVisible = false;
    }
  }));

  return useObserver(() => (
    <div className="search-box">
      <input
        className="search-box__input"
        type="text"
        placeholder="Search..."
        defaultValue={state.search}
        onFocus={state.onInputFocus}
        onBlur={state.onInputBlur}
        onInput={(event) => state.onInputSubmit(event)}
      />
      <div
        className={`search-box__results ${state.isResultsVisible ? 'is-visible' : ''}`}
      >
        {state.results.map((model: any) =>
          <ModelCard
            key={model.id}
            item={model}
          />
        )}
      </div>
    </div>
  ));
};

export default SearchBox;
