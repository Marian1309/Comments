import clsx from 'clsx'
import { FC } from 'react'

import styles from './Spinner.module.scss'

interface SpinnerProps {
  className?: string
}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <div className={clsx(styles.loader, className)} />
}
