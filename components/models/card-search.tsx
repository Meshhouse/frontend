import { Link } from '../../i18n';
import { getImageLink } from '../../helpers/api';
import Icon from '../ui/icon';

const ModelCard = (props: any): JSX.Element => (
  <Link
    href={`/models/view/${props.item.slug}`}
    passHref
  >
    <a
      className="result"
      href={`/models/view/${props.item.slug}`}
    >
      <img
        className="result__image"
        src={getImageLink(props.item.thumbnail)}
        alt={props.item.name}
        loading="lazy"
      />
      <div className="result__info">
        <p className='info__title'>
          {props.item.name}
        </p>
        <div className="info__dccs">
          {props.item.links !== undefined && props.item.links.model.map((item: any, index: number) =>
            <Icon
              key={index}
              icon={`programs/${item.dcc}`}
              id={`Tooltip${item.dcc}`}
            />
          )}
        </div>
      </div>
    </a>
  </Link>
);

export default ModelCard;
