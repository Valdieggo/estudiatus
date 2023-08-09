import { Image, Button } from '@chakra-ui/react';
import { useState } from 'react';

export default function ModalImg({ post }) {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <Image
                id="myImg"
                src={`/api/File/download/${post.file._id}`}
                alt=""
                width="300px"
                height="300px"
                onClick={openModal}
                style={{ borderRadius: '5px', cursor: 'pointer', transition: '0.3s', opacity: modalVisible ? '0.7' : '1' }}
            />
            {modalVisible && (
                <div className="modal">
                    <Button className="close-button" onClick={closeModal} colorScheme="red" size="lg">
                        Cerrar
                    </Button>
                    <Image
                        className="modal-content"
                        src={`/api/File/download/${post.file._id}`}
                        style={{ margin: 'auto', display: 'block', width: '80%', maxWidth: '700px', animation: 'zoom 0.6s' }}
                    />
                    <div id="caption" style={{ margin: 'auto', display: 'block', width: '80%', maxWidth: '700px', textAlign: 'center', color: '#ccc', padding: '10px 0', height: '150px' }}>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* The Modal (background) */
                .modal {
                    display: ${modalVisible ? 'block' : 'none'};
                    position: fixed;
                    z-index: 1;
                    padding-top: 100px;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0.9);
                }

                /* The Close Button */
                .close-button {
                    position: absolute;
                    top: 15px;
                    right: 35px;
                }

                /* Add Animation */
                @keyframes zoom {
                    from {
                        transform: scale(0.1);
                    }
                    to {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};
