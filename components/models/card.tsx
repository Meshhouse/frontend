import { format } from 'date-fns';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from '../../i18n';
import { getImageLink, getDccName } from '../../helpers/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '../ui/icon';


const ModelCard = (props: any): JSX.Element => (
  <div className="models-card">
    <div className="models-card__inner">
      <Link
        href="/models/view/[slug]"
        as={`/models/view/${props.item.slug}`}
        passHref
      >
        <a href={`/models/view/${props.item.slug}`}>
          <img
            className="models-card__image"
            src={getImageLink(props.item.thumbnail)}
            alt={props.item.name}
            loading="lazy"
          />
          <div className="models-card__info">
            <p className='models-card__info-title'>
              {props.item.name}
            </p>
            <p className="models-card__info-time">
              <FontAwesomeIcon icon="calendar-alt" /> {format(props.item.date, 'dd.MM.yyyy')}
            </p>
            <div className="models-card__info-dccs">
              {props.item.links !== undefined && props.item.links.model.map((item: any, index: number) =>
                <div key={index}>
                  <Icon
                    icon={`programs/${item.dcc}`}
                    id={`Tooltip${item.dcc}`}
                  />
                  <UncontrolledTooltip placement="left" target={`Tooltip${item.dcc}`}>
                    {`${getDccName(item)} ${item.dccVersion}`}
                  </UncontrolledTooltip>
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  </div>
);

export default ModelCard;
