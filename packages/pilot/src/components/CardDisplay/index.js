import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const CardDisplay = ({
  children,
  color,
  subtitle,
  title,
  value,
}) => (
  <div className={style.content}>
    <div className={style.title}>
      {
        typeof title === 'string' ?
          <h2 style={{ color }}>{title}</h2> :
          title
      }
    </div>

    {children || (
      <div className={style.value}>
        <h3>{value}</h3>
      </div>
    )}

    <div className={style.subtitle}>
      {subtitle}
    </div>
  </div>
)

CardDisplay.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  subtitle: PropTypes.node,
  title: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
}

CardDisplay.defaultProps = {
  children: null,
  color: '#757575',
  subtitle: null,
  value: '',
}

export default CardDisplay
