import { Spin, Skeleton, Modal as AntModal } from 'antd';
import React, { FC, ReactNode, useState } from 'react';
import styles from './Modal.module.scss';

export type ModalProps = {
  title: string;
  url?: string;
  visible: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  afterClose?: () => void;
  children?: ReactNode;
  height?: string;
  width?: string;
};

export const Modal: FC<ModalProps> = ({
  title,
  url,
  visible,
  handleOk,
  handleCancel,
  afterClose,
  height,
  width,
  children,
}) => {
  const [loading, setLoading] = useState(!!url);

  const modalStyle = {
    padding: '0px',
    minHeight: height,
  };

  const iframe = url && (
    <iframe
      title={title}
      src={url}
      width="100%"
      height="100%"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      frameBorder="0"
      allowFullScreen
      // eslint-disable-next-line react/no-unknown-property
      onLoad={() => setLoading(false)}
    />
  );

  const iframeDisplayStyle = loading ? 'none' : 'inline';

  return (
    <AntModal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={afterClose}
      bodyStyle={modalStyle}
      width={width}
      zIndex={9999}
      footer={null}
      centered
      destroyOnClose
    >
      <>
        {loading && (
          <Skeleton active={loading} style={{ padding: '10px' }} paragraph={{ rows: 10 }} />
        )}

        {iframe && <div style={{ display: iframeDisplayStyle }}>{iframe}</div>}
        {children && <div className={styles.content}>{children}</div>}
        {loading && <Spin className={styles.spinner} spinning={loading} size="large" />}
      </>
    </AntModal>
  );
};
export default Modal;

Modal.defaultProps = {
  url: undefined,
  children: undefined,
  handleOk: undefined,
  handleCancel: undefined,
  afterClose: undefined,
  height: '40vh',
  width: '70%',
};
