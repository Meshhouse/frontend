import Head from 'next/head';
import { Card, CardBody, CardTitle, Input } from 'reactstrap';
import { withTranslation } from '../../i18n';
import { axiosInstance } from '../../helpers/api';
import { useRouter } from 'next/router';
import { useLocalStore, useObserver } from 'mobx-react';

import withLayout from '../../layouts/no-footer';

import ModelCard from '../../components/models/card';
import ModelsSidebar from '../../components/models/sidebar';
import ModelPaginator from '../../components/models/paginator';

const Models = (props: any) => {
  const router = useRouter();
  const category = router.query.category;
  const page = router.query.page ?? 0;

  const state = useLocalStore(() => ({
    query: {
      name: '',
      dcc: ''
    },
    pageData: props.pageData,
    async handleDCCChange(event: any) {
      this.query.dcc = event.target.value;
    },
    async handleNameInput(event: any) {
      if (event.target.value !== this.query.name) {
        this.query.name = event.target.value;
      }
    },
    async handleKeyEnter(event: any) {
      if (event.key === 'Enter') {
        await this.handleNameInput(event);
      }
    }

  }));

  return useObserver(() => (
    <div className='models-view'>
      <Head>
        <title>{ props.t('title') } - Meshhouse</title>
      </Head>
      <ModelsSidebar links={state.pageData.categories} modelsCount={state.pageData.modelsLength} />
      <main className="models-container">
        <div className="models-filter">
          {category !== undefined &&
            <p className='models-filter__title'>{ props.t('title') } - {category}</p>
          }
          {category === undefined &&
            <p className='models-filter__title'>{ props.t('title') }</p>
          }
          <Input
            id="filterName"
            type="text"
            name="name"
            placeholder={ props.t('filters.name.placeholder') }
            defaultValue={state.query.name}
            onBlur={state.handleNameInput}
            onKeyPress={state.handleKeyEnter}
          />
          <Input
            type="select"
            name="dcc"
            id="filterDCC"
            value={state.query.dcc}
            onChange={state.handleDCCChange}
          >
            <option value="">{ props.t('filters.dcc.any') }</option>
            <option value="3dsmax">3ds Max</option>
            <option value="maya">Maya</option>
            <option value="blender">Blender</option>
            <option value="cinema4d">Cinema 4D</option>
            <option value="houdini">Houdini</option>
            <option value="modo">Modo</option>
          </Input>
        </div>
        <div className="models-grid">
          {state.pageData.models !== undefined && state.pageData.models.length > 0 &&
            state.pageData.models.map((item: any) =>
              <ModelCard key={item.id} item={item} />
            )}
          {state.pageData.models !== undefined && state.pageData.models.length === 0 &&
            <Card>
              <CardBody>
                <CardTitle tag="h1" dangerouslySetInnerHTML={{ __html: props.t('notFound')}} />
              </CardBody>
            </Card>
          }
        </div>
        {state.pageData.totalPages > 1 &&
          <div className="models-pagination">
            <ModelPaginator
              route={router}
              totalPages={state.pageData.totalPages}
            />
          </div>
        }
      </main>
    </div>
  ));
};

Models.Layout = withLayout;

Models.getInitialProps = async(ctx: any): Promise <any> => {
  const category = ctx.query.category;
  const page = ctx.query.page ?? 0;
  let fetch: any = {};
  try {
    fetch = await axiosInstance.post('',
      {
        'jsonrpc': '2.0',
        'method': 'models.get',
        'params': {
          category: category,
          page: page,
          query: {
            dcc: '',
            name: ''
          }
        },
        'id': 1
      });
  } catch (error) {
    fetch = {
      data: {
        result: {
          categories: [],
          models: []
        }
      }
    };
  }
  return {
    pageData: fetch.data.result,
    namespacesRequired: ['pages-models'],
  };
};

export default withTranslation('pages-models')(Models);
