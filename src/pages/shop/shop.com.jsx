import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.com'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.com';

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot); 
            updateCollections(collectionsMap);
        })

    }
    


    render() {
        const {match} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div> 
            );
    }
}  

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
}) 

export default connect(null,mapDispatchToProps)(ShopPage);