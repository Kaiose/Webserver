
import React from "react";
import { View , Text, Button, TextInput, StatusBar, Image, TouchableOpacity, YellowBox, Dimensions,StyleSheet,Platform, Alert} from "react-native";
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,  Root ,Form, Item, Label, Input , Picker} from "native-base";
import { createStackNavigator, createAppContainer, StackActions, NavigationActions, createDrawerNavigator,DrawerActions } from "react-navigation";
import { FlatList, ScrollView } from "react-native-gesture-handler";

var g_username;
var g_userid;
var g_projectList = [];
var g_currentRepo;
class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userid:'',
      password:'',
      error:''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Well Come to Coding Paper'),
      headerStyle: {
        backgroundColor: 'black',
        
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center'
      },
      
    }
  }
  render(){
    return(

      <View style = { {flex : 1, alignItems: "center", justifiyContent: 'space-between'}}>
        <View style = { {flex : 1, alignItems: "center"}}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <Text style = { {fontSize: 20, fontWeight: 'bold', margin: 10 }}>Login WebIDE</Text> 
        
        <Text style = { {fontSize: 15, fontWeight: 'bold' }}>Email</Text> 
        
        <TextInput style={{height: 40, width: 250, borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
        onChangeText={(userid) => this.setState({userid})}
        maxLength = {15}
        //value={this.state.text}
        />

        <Text style = { {fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Password</Text> 
        
        <TextInput style={{height: 40, width: 250, borderColor: 'gray', borderBottomWidth: 1, }}
        onChangeText={(password) => this.setState({password})}
        maxLength = {15}
        //value={this.state.text}
        />
      </View>



      <View style = { {flex : 0,  flexDirection: 'column', margin : 20, position: 'absolute', left: 0, right: 0, bottom: 0} }>
        <Button
           style = { {  width: '100%',}}
           title="Sign In"
            onPress={() => { 
              
              g_userid = this.state.userid;
                              /*
                            this.props.navigation.setParams({otherParam:  JSON.stringify({
                              userid: this.state.userid,
                              password: this.state.password,
                            })}),
                            */
                            fetch('http://223.194.100.67:8080/pdo_prepared/login.php/', {
                              method: 'POST',
                              headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/x-www-form-urlencoded',
                              },
                              body: JSON.stringify({
                                userid: this.state.userid,
                                password: this.state.password,
                              })
                            }
                            ).then((response) => response.json())
                            .then(function(responseJson){
                              g_username = responseJson.name;
                             
                              if(responseJson.projectList != null){
                              for (let project of responseJson.projectList){
                                g_projectList = g_projectList.concat(project["projectName"]);
                              }
                            }
                              alert("Hello " +  responseJson.name)
//                              g_projectList = responseJson.projectList;

                              return responseJson.error
                            })
                            .then((error)=>{ 

                              if(error == "no"){
                                
                                //this.props.navigation.navigate('LeftDrawer');
                                /*
                                this.props.navigation.navigate('LeftDrawer', {
                                  username: this.state.username,
                                  userid: this.state.userid,
                                })
                                */
                                this.props.navigation.dispatch(
                                  //<LeftDrawer name={this.state.username} />,
                                  
                                  StackActions.reset( 
                                    { 
                                      index : 0, 
                                     
                                      actions : [NavigationActions.navigate( { routeName: 'LeftDrawer'})],
                                    }
                                  )
                                )
                                
                              }
                            })
                            .catch((error) => {
                             // console.error(error);
                            })
                            

                            
                          
                    }
                  }
         />
        <Text></Text>
        <Text style = { {  width: '100%',fontSize: 15, fontWeight: 'bold', marginLeft: 160 ,textDecorationLine: 'underline'}}
        
        onPress = { () => {
          this.props.navigation.dispatch(
            StackActions.reset( 
              {    
                index : 0, 
                actions : [NavigationActions.navigate( { routeName: 'SignUp'})],
              }
            )
          )
        }}>Sign Up</Text>
        
         </View>
      </View>
    );
  }
}



class WorkSpace extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filename : "Code.cpp",
      code : "",
    }
  }
/*
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Well Come to Coding Paper'),
      headerStyle: {
        backgroundColor: 'black',
        
      },
      headerLeft:  <TouchableOpacity// onPress={() => this.props.navigation.openDrawer()}
      > 
                    <Image  source={require('./github.png')}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                      />
                    </TouchableOpacity>
    ,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center'
      },
      
    }
  }
  */

  componentDidMount() {
    this.props.navigation.setParams({ code: 'this is code' });
  }



  render(){
    const code = this.props.navigation.getParam('code');
    return(
     
      <View style = { {flex : 1, justifiyContent: 'space-between'}}>
        
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Text style={this.props.username}></Text>
        <View style = { {flex : 0.1, flexDirection: "row"  , margin : 20, alignItems: 'center' } }>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} > 
                    <Image  source={require('./github.png')}
                    style={{ width: 40, height: 40, marginLeft: 5 }}
                      />
                    </TouchableOpacity>
        <Text style = { {fontSize: 30, fontWeight: 'bold', marginLeft: 50 , marginRight: 50}}>Work Space</Text> 
        <Button title = "Run"
          alignItems = 'center'
          height = '100'
          color="#555"
          
           style = { {height: 20}}
            onPress = {() => {

             // alert(this.state.code);
              //alert(JSON.stringify(this.state['code'])); // "hello" -> "\"hello\"" -> \"\\\"hello\\\"\" 
              //json.slice(1,json.length-1)
            
           // alert(JSON.stringify(this.props.navigation.getParam('code')));
            //this.props.navigation.setParams({code : this.props.navigation.getParam('code')});
            let formBody = [];
            for (let property in this.state){
              let encodeKey = encodeURIComponent(property);
              let encodeValue = encodeURIComponent(this.state[property]);
              formBody.push(encodeKey + "=" + encodeValue);
            }

            formBody.push(encodeURIComponent("repo") + "=" + encodeURIComponent(g_currentRepo));

            formBody = formBody.join("&");

            fetch('http://223.194.100.67:8080/WebServer/CodeCompiler.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
          }) .then((response) => response.json())
          .then(function(responseJson){
            if(responseJson.result != undefined){
              alert(responseJson.result);
            }
          })   
  
          }}
          
        />

       </View>

       <View style = { {flex : 0.8, alignItems: "center"}}>
        {/*<Text style = { {fontSize: 30, fontWeight: 'bold' , marginLeft : 60, width : "100%"}}>Code</Text> */} 
        
        <TextInput style = {{fontSize: 30, fontWeight: 'bold' , marginLeft : 60, width : "100%"} }
            defaultValue="Code"
            
            maxLength={20}
            onChangeText={ (filename) => this.setState({ filename }) }

        />

        <TextInput style={{height: 400, width: 350, borderColor: 'gray' ,borderWidth: 1, }}
          label = 'work space'
          autoCorrect = {false}
          spellCheck = {false}
          allowFontScaling = {false}
          multiline = {true}
          numberOfLines = {10}
          textAlignVertical = 'top'
          defaultValue= {code}
          onChangeText={ (code) => this.setState({ code }) }
          
        />

        <Button title = "go to Home"
        onPress = {() => {
          this.props.navigation.dispatch(


            StackActions.reset( 
              { 
                index : 0, 
                
                actions : [NavigationActions.navigate( { routeName: 'Home'})],
                
              }
            )
          )
        }}
        />  

      </View>


      </View>
    );
  }
}

class SignUpScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userid:'',
      password:'',
      username:'',
      error:'',
      IsPress: true
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Well Come to Coding Paper'),
      headerStyle: {
        backgroundColor: 'black',
        
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center'
      },
      
    }
  }
  render(){
    return(


      <View style = { {flex : 1, alignItems: "center", justifiyContent: 'space-between'}}>
        <View style = { {flex : 1, alignItems: "center"}}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <Text style = { {fontSize: 20, fontWeight: 'bold', margin: 10 }}>Sign Up for WebIDE</Text> 
        
        
        <Text style = { {fontSize: 15, fontWeight: 'bold' }}>Username</Text> 
        
        <TextInput style={{height: 40, width: 250, borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
        onChangeText={(username) => this.setState({username})}
        maxLength = {15}
        onFocus= {()=>{this.setState({IsPress: false})}}
        
        onSubmitEditing= {()=>{this.setState({IsPress: true})}}
        //value={this.state.text}
        />

        <Text style = { {fontSize: 15, fontWeight: 'bold' }}>Email</Text> 
        
        <TextInput style={{height: 40, width: 250, borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
        onChangeText={(userid) => this.setState({userid})}
        maxLength = {15}
        onFocus= {()=>{this.setState({IsPress: false})}}
        
        onSubmitEditing= {()=>{this.setState({IsPress: true})}}
        //value={this.state.text}
        />

        <Text style = { {fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Password</Text> 
        
        <TextInput style={{height: 40, width: 250, borderColor: 'gray', borderBottomWidth: 1, }}
        onChangeText={(password) => this.setState({password})}
        onFocus= {()=>{this.setState({IsPress: false})}}
        
        onSubmitEditing= {()=>{this.setState({IsPress: true})}}
        maxLength = {15}
        //value={this.state.text}
        />
      </View>



      <View style = { {flex : 0,  flexDirection: 'column', margin : 20, position: 'absolute', left: 0, right: 0, bottom: 0} }>

       { this.state.IsPress ? 
        <Button
           style = { {  width: '100%', position: 'absolute'}}
           title="Sign Up"
            onPress={() => { 
                            this.props.navigation.setParams({otherParam:  JSON.stringify({
                              userid: this.state.userid,
                              password: this.state.password,
                            })}),
                            
                            fetch('http://223.194.100.67:8080/pdo_prepared/SignUp.php/', {
                              method: 'POST',
                              headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/x-www-form-urlencoded',
                              },
                              body: JSON.stringify({
                                userid: this.state.userid,
                                password: this.state.password,
                                username: this.state.username,
                              })
                            }
                            ).then((response) => response.json())
                            .then(function(responseJson){
                              alert(responseJson.error)
                              return responseJson.error
                            })
                            .then((error)=>{ 
                              
                              if(error == "Regist Success"){
                                this.props.navigation.dispatch(
                                  StackActions.reset( 
                                    { 
                                      index : 0, 
                                      actions : [NavigationActions.navigate( { routeName: 'Home'})],
                                    }
                                  )
                                )
                              }
                            })
                            .catch((error) => {
                             // console.error(error);
                            })
                            

                            
                          
                    }
                  }
         />:null
                }      
        <Text></Text>
                
         </View>
      </View>
    );
  }
}


class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      text:props.text,
      }
  }

  render(){
    return(
      <ListItem 
      
      onLongPress= {
        ()=>{
        
          Alert.alert('Are you sure you want to erase it?',
          'If deleted, recovery is not possible.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
              fetch('http://223.194.100.67:8080/WebServer/DeleteRepo.php', {
                method: 'POST',
                headers: {
                     Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({
                  userid: g_userid,
                  filename: this.props.text
                })
            })
            }},
          ],
          {cancelable: false},)
        }
      }
      
      onPress={() => {
        this.props.navigation.closeDrawer();
      //  this.props.navigation._childrenNavigation.WorkSpace.state.params.code = "hello";
     //  alert(JSON.stringify(this.props.navigation._childrenNavigation.WorkSpace.state.params.code));
        //this.props.navigation.setParams({code:"hello"});
        
//        this.props.navigation.closeDrawer()
        g_currentRepo = this.props.text;

        var code = '';
        fetch('http://223.194.100.67:8080/WebServer/GetRepo.php', {
          method: 'POST',
          headers: {
               Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({
            userid: g_userid,
            filename: this.props.text
          })
      }).then((response) => response.json())
      .then(function(responseJson){
      //  alert(JSON.stringify(this.props.navigation._childrenNavigation.WorkSpace.state.params.code));
        return responseJson.data;
      })
      .then((code)=>{
//        this.props.navigation._childrenNavigation.WorkSpace.state.params.code = code;
        if(code != "" ){
          this.props.navigation._childrenNavigation.WorkSpace.setParams({code:code});
        }
          //  alert(this.props.navigation._childrenNavigation.WorkSpace.state.params.code);
      })
      
      }} selected>
  <Left>
  <Text>{this.props.text}</Text>
  </Left>
  <Right>
  <Icon name="arrow-forward" />
  </Right>
  </ListItem>
    );
  }

}

class LeftSideBar extends React.Component {
  constructor(props) {
  super(props)
    //alert("LeftSideBar" + g_username)
    this.state={
      filename: '',
      menuList:[],
    }

   
  }
  
  componentDidMount() {
    let list = [];
    
    for ( var i = 0 ; i < g_projectList.length ; i++){
      list.push(<Menu text= {g_projectList[i]} navigation={this.props.navigation}/>);
    } 
    g_projectList = [];
        this.setState({menuList: list});
      
  }



  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  navigateToScreen = (route) => () => {
  const navigate = NavigationActions.navigate({
  routeName: route
  });
  this.props.navigation.dispatch(navigate);
  }
  
  render() {

  return (
  
  <ScrollView>
   
  
  <Container>
  <Header>

  <Body>
  <Title>Hello! {g_username}</Title>
  </Body>
  <Right >
    
  <Icon name="settings" onPress={() => this.props.navigation.dispatch(
                                  StackActions.reset( 
                                    { 
                                      index : 0, 
                                      actions : [NavigationActions.navigate( { routeName: 'Home'})],
                                    }
                                  )
                                )} />
  </Right>
  
  </Header>
  <Content>
 
  <List>

  <ListItem onPress={() => {
    
    this.setState({menuList: this.state.menuList.concat(<Menu text= {this.state.filename} navigation={this.props.navigation}/>)})
  
    fetch('http://223.194.100.67:8080/WebServer/CreateRepo.php', {
      method: 'POST',
      headers: {
           Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        userid: g_userid,
        filename: this.state.filename
      })
  })   

  }}>
  <Left>
  <TextInput style={{height: 40, width: 250, borderColor: 'gray' }}
        onChangeText={(filename) => this.setState({filename})}
        placeholder='New Repogitory'
        maxLength = {15}
        //value={this.state.text}
  />
  </Left>
  <Right>
  <Icon name="plus" type='AntDesign'/>
  </Right>
  </ListItem>


  {this.state.menuList}


  </List>
  </Content>
  </Container>
  </ScrollView>
  )
  }
  }
const WIDTH = Dimensions.get('window').width;

const LeftDrawer = createDrawerNavigator(
  
  {
    WorkSpace: { screen: WorkSpace}
  },
  {
    initialRouteName: "WorkSpace",

    
    navigationOptions : (navigation) => {
      return{
        title:   'Well Come to Coding Paper',
        headerStyle: {
          backgroundColor: 'black',
          
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          width: '90%', 
          textAlign: 'center'
        },
    }

  },
    drawerWidth:WIDTH*0.80,
    drawerPosition:'left',
    contentOptions: {
    activeTintColor: "#e91e63"
    },
    
    contentComponent: (props) => <LeftSideBar username={()=>{return g_username}} {...props} />,
    drawerOpenRoute: 'LeftSideMenu',
    drawerCloseRoute: 'LeftSideMenuClose',
    drawerToggleRoute: 'LeftSideMenuToggle',
    }
  
)

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen

    },
    SignUp: {
      screen: SignUpScreen,
    },
    WorkSpace: {
      screen: WorkSpace,
    },
    LeftDrawer:{
      screen: LeftDrawer,
    },
  },
  {
    initialRouteName: 'Home',
   // headerMode: "none",
    //  swipeEnabled: false
    
  }
);

export default createAppContainer(AppNavigator);

