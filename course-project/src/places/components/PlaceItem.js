import React, { useState } from "react";

import "./PlaceItem.css";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import Modal from "../../shared/UIElements/Modal";
import Map from "../../shared/UIElements/Map";
const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => {
        setShowMap(true);
    };

    const closeMapHandler = () => {
        setShowMap(false);
    };

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log("DELETING....");
    };

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.adress}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}></Map>
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this place? Please note
                    that it cant be undone thereafter.
                </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h1>{props.title}</h1>
                        <h1>{props.adress}</h1>
                        <h1>{props.description}</h1>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>
                            VIEW PLACE ON MAP
                        </Button>
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button danger onClick={showDeleteWarningHandler}>
                            DELETE
                        </Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};
export default PlaceItem;
