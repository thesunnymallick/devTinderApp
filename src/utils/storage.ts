import AsyncStorage from "@react-native-async-storage/async-storage"

export const Storage={
    async getToken(){
        return await AsyncStorage.getItem("token")
    },

    async setToken(token:string){
        return await AsyncStorage.setItem("token", token)
    },

    async removeToken(){
        return await AsyncStorage.removeItem("token")
    }

}