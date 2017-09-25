import React, { Component } from 'react';
import { 
    View,
    Text, 
    ScrollView,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredientsInput: '',
            searching: false,
        }
    }

    handleTextChange(e) {
        // take a copy of the fish and update it with new data
        let ingredientsInput = this.state.ingredientsInput;
        ingredientsInput = e.target.value;;
        this.setState({ ingredientsInput })
    } 

    searchPressed(){
        this.setState({searching:true});
        this.props.fetchRecipes(this.state.ingredientsInput).then( () => {
            this.setState({searching: false});
        });
    }

    recipes() {
        return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key] )
    }

    render(){
        return (
            <View style={styles.scene}>
                <View style={styles.searchSection}>
                    <TextInput 
                        style={styles.searchInput} 
                        returnKeyType='search'
                        placeholder='Ingredients'
                        underlineColorAndroid='transparent'
                        onChangeText={ (ingredientsInput) => this.setState({ingredientsInput}) }
                        value={this.state.ingredientsInput}
                    />
                    <TouchableHighlight onPress={ () => this.searchPressed() } style={styles.searchButton}>
                        <Text>Fetch Recipes</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView style={styles.scrollSection}>
                    {!this.state.searching && this.recipes().map( (recipe) => {
                        return (
                            <View key={recipe.id} >
                                <Image source={ {uri: recipe.image} } style={styles.resultImage}/>
                                <Text style={styles.resultText}>{recipe.title}</Text>
                            </View>
                        );
                    })}{ this.state.searching ? <Text>Searching...</Text> : null }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scene:{
        flex: 1,
        marginTop: 20,
    },
    searchSection: {
        height: 30,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 5,
        flexDirection: 'row',
        zIndex: 1,
    },
    searchInput:{
        flex: 0.7,
        zIndex: 10,
    },
    searchButton: {
        flex: 0.3,
    },
    scrollSection: {
        flex: 0.8
    },
    resultImage: {
        height:150,
    },
    resultText: {
        height: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 3,
    },
});

function mapStateToProps(state){
    return{
        searchedRecipes: state.searchedRecipes
    }
}

export default connect(mapStateToProps)(Home);