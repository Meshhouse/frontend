import Head from 'next/head';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Table } from 'reactstrap';
import { getPreviewLink, getImageLink, getDccName, getStringedArray } from '../../../helpers/api';
import { format } from 'date-fns';
import Carousel from 'nuka-carousel';
import { withTranslation } from '../../../i18n';
import { axiosInstance } from '../../../helpers/api';
import withLayout from '../../../layouts/main';

import Icon from '../../../components/ui/icon';
import Badge from '../../../components/ui/badge';
import { useEffect } from 'react';

const Model = (props: any): JSX.Element => {
  useEffect(() => {
    import('@meshhouse/model-viewer') as any;
  });

  const model = props.model;
  return (
    <>
      <Head>
        <title>{model.name} - Meshhouse</title>
        <script type="application/ld+json">
          {`{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "${model.name}",
          "image": [
            "${getImageLink(model.thumbnail)}",
            "${getImageLink(model.images[0])}",
          ],
          "description": "${model.info.description}",
          "sku": "MSH-${model.id}",
          "brand": {
            "@type": "Brand",
            "name": "Long-Sighted Films"
          },
          "offers": {
            "@type": "Offer",
            "url": "${props.pathname}",
            "priceCurrency": "USD",
            "price": "0.00",
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Maxim Makarov"
            }
          }
        }`}
        </script>
      </Head>
      <Carousel
        className='models-slider'
        initialSlideHeight={960}
        dragging={false}
      >
        {model.images.map((image: string, idx: number) => (
          <div
            className='slide-inner'
            key={`slide-${idx}`}
          >
            <img
              src={getImageLink(image)}
              alt={model.name}
              loading="lazy"
            />
          </div>
        ))}
        <div className='slide-inner'>
          <model-viewer
            model={getPreviewLink(model.preview)}
            hdri="/static/images/hdri/colorful_studio_1k.hdr"
            modeltitle={model.name}
            author="Long-Sighted Films"
            authorlink="https://longsightedfilms.com"
            autohide={true}
            thumbnail={getImageLink(model.thumbnail)}
          >
            <span slot="loader">
              <img src='/static/icons/logo-icon.svg' alt="Meshhouse" />
            </span>
            <span slot="logo">
              <img src='/static/icons/logo-icon.svg' alt="Meshhouse" />
            </span>
          </model-viewer>
        </div>
      </Carousel>
      <header className="models-header">
        <h1>{model.name}</h1>
        <div className="buttons">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="primary"
              size="lg"
              caret
            >
              { props.t('download.modelButton') }
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>
                { props.t('download.texturesTitle') }
              </DropdownItem>
              <DropdownItem
                href={model.links.textures}
                disabled={model.links.textures === null}
              >
                { props.t('download.texturesButton') }
              </DropdownItem>
              <DropdownItem header>
                { props.t('download.modelTitle') }
              </DropdownItem>
              {model.links.model.map((item: any, idx: number) => (
                <DropdownItem key={idx} href={item.link}>
                  <Icon icon={`programs/${item.dcc}`} />
                  {getDccName(item)} {item.dccVersion} - {item.renderer} ({item.size})
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Button
            id="download-app"
            tag="a"
            color="primary"
            size="lg"
            href={`meshhouse://install/MSH-${model.id}`}
          >
            <Icon
              className="mr-2"
              icon="logo-icon"
            />
            { props.t('download.application') }
          </Button>
        </div>
      </header>
      <main className="models-description">
        <div className="description">
          <>
            {model.brand.length !== 0 && (
              <>
                <h3 className="header">
                  <span>{ props.t('download.legalNoticeTitle') }</span>
                </h3>
                <p>
                  { props.t('download.application', { brand: getStringedArray(model.brand) }) }
                </p>
              </>
            )}
            {model.info.description !== '' && (
              <>
                <h3 className="header">
                  <span>Description</span>
                </h3>
                <div dangerouslySetInnerHTML={{ __html: model.info.description }} />
              </>
            )}
            {model.tags.length !== 0 && (
              <>
                <h3 className="header">
                  <span>Tags</span>
                </h3>
                <div className="tags-container">
                  {model.tags.map((tag: any, idx: number) => (
                    <Badge key={`tag-${idx}`}>{tag}</Badge>
                  ))}
                </div>
              </>
            )}
          </>
        </div>
        <div className="info">
          <div className="models-info-card">
            <h3 className="header">Model information</h3>
            <div className="content">
              <Table bordered>
                <tbody>
                  <tr>
                    <th>Product id</th>
                    <td>MSH-{model.id}</td>
                  </tr>
                  <tr>
                    <th>{ props.t('date') }</th>
                    <td>{format(model.date, 'dd.MM.yyyy')}</td>
                  </tr>
                  <tr>
                    <th>{ props.t('polys') }</th>
                    <td>{model.info.polys}</td>
                  </tr>
                  <tr>
                    <th>{ props.t('verts') }</th>
                    <td>{model.info.verts}</td>
                  </tr>
                  <tr>
                    <th>{ props.t('hairFur.title') }</th>
                    <td>{ props.t(`hairFur.${model.info.hairFur}`) }</td>
                  </tr>
                  <tr>
                    <th>{ props.t('morpher.title') }</th>
                    <td>{ props.t(`morpher.${model.info.morpher}`) }</td>
                  </tr>
                  <tr>
                    <th>{ props.t('skinning.title') }</th>
                    <td>{model.info.skinning === 'none' && props.t(`skinning.${model.info.skinning}`) }</td>
                  </tr>
                  <tr>
                    <th>{ props.t('download.texturesTitle') }</th>
                    <td>{ props.t(`textures.${model.info.textures}`) }</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Model.Layout = withLayout;

Model.getInitialProps = async(ctx: any): Promise <any> => {
  const slug = ctx.query.slug;
  let fullUrl: string;
  if (ctx.req) {
    // Server side rendering
    fullUrl = ctx.req.protocol + '://' + ctx.req.get('host') + ctx.req.originalUrl;
  } else {
    // Client side rendering
    fullUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }
  let fetch: any = {};
  try {
    fetch = await axiosInstance.post('',
      {
        'jsonrpc': '2.0',
        'method': 'models.get.single',
        'params': {
          slug
        },
        'id': 1
      });
  } catch (error) {
    console.log(error);
  }
  return {
    pathname: fullUrl,
    model: fetch.data.result[0],
    namespacesRequired: ['pages-model'],
  };
};

export default withTranslation('pages-model')(Model);
