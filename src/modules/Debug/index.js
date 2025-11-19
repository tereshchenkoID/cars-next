import React, { useState } from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Debug = ({ data }) => {
  const [active, setActive] = useState(false)

  return (
    <div className={style.block}>
      <button
        type="button"
        className={classNames(style.button, active && style.active)}
        onClick={() => setActive(!active)}
      >
        Debug
      </button>
      {active && (
        <pre className={style.pre}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default Debug
