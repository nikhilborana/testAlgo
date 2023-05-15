import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, FlatList, Animated } from 'react-native';

const tradeData = [
  {capital:"5.13 Cr", PNL:"-44.67 k (-0.009%)", value:"-44.67 L (44)"},
  {capital:"5.10 Cr", PNL:"-42.65 k (-0.009%)", value:"-42.65 L (42)"},
  {capital:"5.18 Cr", PNL:"-43.68 k (-0.009%)", value:"-43.68 L (43)"},
  {capital:"5.11 Cr", PNL:"-47.67 k (-0.009%)", value:"-47.67 L (47)"},
  {capital:"5.12 Cr", PNL:"-46.66 k (-0.009%)", value:"-46.66 L (46)"},
  {capital:"5.19 Cr", PNL:"-48.68 k (-0.009%)", value:"-48.68 L (48)"},
  {capital:"5.16 Cr", PNL:"-49.62 k (-0.009%)", value:"-49.62 L (49)"},
  {capital:"5.17 Cr", PNL:"-45.65 k (-0.009%)", value:"-45.65 L (45)"},
  {capital:"5.15 Cr", PNL:"-41.36 k (-0.009%)", value:"-41.36 L (41)"},
  {capital:"5.14 Cr", PNL:"-43.66 k (-0.009%)", value:"-43.66 L (43)"},
]

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function HomeScreen({ navigation }) {

  const [showData, setShowData] = React.useState(tradeData[0]);


  React.useEffect(() => {
    const interval = setInterval(() => {
      // Update the state here
      const shuffledData = [...tradeData].sort(() => getRandomNumber(-1, 1))[0]
      setShowData(shuffledData);
    }, 500); // 5000 milliseconds = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity><Image style={{height:25, width:25}} source={require("./navigation.png")}/></TouchableOpacity>
      ),
      headerTitle:"Strategies",
      headerShadowVisible: false,
      headerStyle:{
        backgroundColor:'white'
      },
      headerTitleStyle:{
        fontSize:18,
        fontFamily: 'Montserrat-Regular',
        fontWeight: "700",
        color: "#000000"
      }
    });
  }, [navigation]);
  

    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor:'white' }}>
        <View style={{backgroundColor:'#6771E4', height:130, borderRadius:10, width:"90%",overflow:'hidden', marginTop:32}}>
          <View style={{flex:0.5,  flexDirection:'row'}}>
            <View style={{flex:0.4,  justifyContent:'center', paddingLeft:10}}>
              <Text style={{
                fontSize:18,
                fontFamily: 'Montserrat-Regular',
                fontWeight: "700",
                color: "white"
              }}>
                Summary
              </Text>
            </View>
            <View style={{flex:0.6,justifyContent:'center', alignItems:'flex-end'}}>
              <View style={{height:35, width:'70%',flexDirection:'row', justifyContent:'space-between',padding:10, alignItems:'center', marginRight:14, borderColor:'#989DDF', borderWidth:1, borderRadius:6}}>
                <Text style={{
                  fontSize:12,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "400",
                  color: "white"
                }}>
                  Expiry
                </Text>
                <Image style={{height:20, width:20, tintColor:'white'}} source={require("./down-arrow.png")}/>
              </View>
            </View>
          </View>
          <View style={{flex:0.5, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:14}}>
            <View style={{flex:0.33, alignItems:'center'}}>
              <Text style={{
                  fontSize:15,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "700",
                  color: "white",
                  marginBottom:7
                }}>
                  Capital:
              </Text>
              <Text style={{
                  fontSize:12,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "400",
                  color: "white"
                }}>
                  {"₹ " + showData.capital}
              </Text>
            </View>
            <View style={{flex:0.33, alignItems:'center'}}>
              <Text style={{
                  fontSize:15,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "700",
                  color: "white",
                  marginBottom:7
                }}>
                  P&L:
              </Text>
              <Text style={{
                  fontSize:12,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "400",
                  color: "white"
                }}>
                  {"₹ " + showData.PNL}
              </Text>
            </View>
            <View style={{flex:0.33, alignItems:'center'}}>
              <Text style={{
                  fontSize:15,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "700",
                  color: "white",
                  marginBottom:7
                }}>
                  Value:
              </Text>
              <Text style={{
                  fontSize:12,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "400",
                  color: "white"
                }}>
                  {"₹ " + showData.value}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
        style={{width:'90%', flex:1, paddingTop:24, top:-10, zIndex:-999}}
        data={[
          {key: 'GSA BNF Directional'},
          {key: 'GSA Nifty Directional'},
          {key: 'Banknifty Fighter Lite Positional'},
          {key: 'Banknift Fighter Positional'},
          {key: 'Overnight Miner'},
          {key: 'Overnight Miner Nifty'}
        ]}
        ItemSeparatorComponent={()=><View style={{backgroundColor:'#E7E7E7', height:1, width:"100%"}}></View>}
        // renderItem={({item}) => {
        //   return 
        // }
      // }
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id}
      />
      </View>
    );
  }


  const ListItem = ({ item }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [animation, setAnimation] = React.useState(new Animated.Value(0));
  
    React.useEffect(() => {
      if (expanded) {
        Animated.spring(animation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(animation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }, [expanded]);

    const handlePress = () => {
      setExpanded(!expanded);
    };
  
    const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  
    return (
        <View style={{ width:'100%', paddingTop:11, paddingBottom:10,}}>
          <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
            <Text style={{color:'#6771E4',
              fontSize:13,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "600",
              lineHeight:20
              }}>
              {item.key}
            </Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{color:'#8B8B8B',
                fontSize:12,
                fontFamily: 'Montserrat-Regular',
                fontWeight: "400",
                lineHeight:18
                }}>{"Live-Entered"}</Text>
                <View style={{ flexDirection:'row'}}>
                  <Text style={{color:'#8B8B8B',
                  fontSize:12,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "400",
                  lineHeight:18
                  }}>{"₹ "}</Text>
                  <Text style={{color:true?'#4B994C':"#D73842",
                  fontSize:12,
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: "400",
                  lineHeight:18
                  }}>{"2,502 (1.00 %)"}</Text>
                </View>
            </View>
                </TouchableOpacity>
      <Animated.View style={{ transform: [{ scaleY: animatedHeight }] }}>
        {/* Content to be expanded */}
        {expanded && ExpandView()}
      </Animated.View>
      </View>
    );
  };

  const ExpandView = () => {
      return (
        <View style={{ width:'100%', paddingTop:11, paddingBottom:10,}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color:'#000000',
              fontSize:13,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "600",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"OTY:"}
            </Text>
            <Text style={{color:'#000000',
              fontSize:13,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "600",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"LTP:"}
            </Text>
            <Text style={{color:'#000000',
              fontSize:13,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "600",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"Val:"}
            </Text>
            <Text style={{color:'#000000',
              fontSize:13,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "600",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"PNL:"}
            </Text>
          </View>
          {[0,1,2,3,4,5,6,7,8,9].map((item)=>{
            return (
            !(item % 2 === 0) ? <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color:'#000000',
              fontSize:12,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "400",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"0"}
            </Text>
            <Text style={{color:'#000000',
              fontSize:12,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "400",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"2.30"}
            </Text>
            <Text style={{color:'#000000',
              fontSize:12,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "400",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"160"}
            </Text>
            <Text style={{color:false?'#4B994C':"#D73842",
             fontSize:12,
             fontFamily: 'Montserrat-Regular',
             fontWeight: "400",
             lineHeight:20, textAlign:'left', flex:1
              }}>
                {"-233"}
            </Text>
          </View> : <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color:'#000000',
              fontSize:12,
              fontFamily: 'Montserrat-Regular',
              fontWeight: "400",
              lineHeight:20, textAlign:'left', flex:1
              }}>
                {"1.OPTIDX_BANKNIFTY_04MAY2023_CE_45000"}
            </Text>
          </View>)
          })}
        </View>
      )
  }
  