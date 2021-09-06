<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} {{$t('sidebar.asset')}}</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-input :label="$t('property.assetNickname')"
                      :placeholder="$t('property.assetNickname')"
                      v-model="resource.model.asset_nickname"
                      :error="tmpApiValidationErrors.asset_nickname ? tmpApiValidationErrors.asset_nickname[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_nickname"/> -->
        </div>
        <div class="col-md-6">
          <base-selector-input :label="$t('property.assetType')"
                               :placeholder="$t('property.assetType')"
                               v-model="resource.model.asset_type"
                               :options="resource.selector.asset_type"
                               :error="tmpApiValidationErrors.asset_type ? tmpApiValidationErrors.asset_type[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_type"/> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input :label="$t('property.ownershipType')"
                               :placeholder="$t('property.ownershipType')"
                               v-model="resource.model.asset_ownership_type"
                               :options="resource.selector.asset_ownership_type"
                               :error="tmpApiValidationErrors.asset_ownership_type ? tmpApiValidationErrors.asset_ownership_type[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_ownership_type"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.assetSize')"
                      :placeholder="$t('property.assetSize')"
                      type="number"
                      v-model="resource.model.asset_size"
                      :error="tmpApiValidationErrors.asset_size ? tmpApiValidationErrors.asset_size[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_size"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.numberOfRooms')"
                      type="number"
                      :placeholder="$t('property.numberOfRooms')"
                      v-model="resource.model.number_of_rooms"
                      :error="tmpApiValidationErrors.number_of_rooms ? tmpApiValidationErrors.number_of_rooms[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.number_of_rooms"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.numberOfBathrooms')"
                      type="number"
                      :placeholder="$t('property.numberOfBathrooms')"
                      v-model="resource.model.number_of_bathrooms"
                      :error="tmpApiValidationErrors.number_of_bathrooms ? tmpApiValidationErrors.number_of_bathrooms[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.number_of_bathrooms"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input :label="$t('property.isMultiUnit')"
                      type="checkbox"
                      :checked="typeof resource.model.is_multi_unit == 'boolean' ? resource.model.is_multi_unit : (typeof resource.model.is_multi_unit == 'string' ? resource.model.is_multi_unit == 'true' : false)"
                      v-model="resource.model.is_multi_unit"
                      :error="tmpApiValidationErrors.is_multi_unit ? tmpApiValidationErrors.is_multi_unit[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_multi_unit"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.isOccupied')"
                      type="checkbox"
                      :checked="typeof resource.model.is_occupied == 'boolean' ? resource.model.is_occupied : (typeof resource.model.is_occupied == 'string' ? resource.model.is_occupied == 'true' : false)"
                      v-model="resource.model.is_occupied"
                      :error="tmpApiValidationErrors.is_occupied ? tmpApiValidationErrors.is_occupied[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_occupied"/> -->
        </div>
      </div>
    </card>
    <card>
      <h5 slot="header" class="title">{{$t('property.locationDetails')}}</h5>
      <div class="row">
        <div class="col-md-3">
          <base-input :label="$t('property.unitNo')"
                      :placeholder="$t('property.unitNo')"
                      v-model="resource.model.location_details.asset_unit_no"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_unit_no ? tmpApiValidationErrors.asset_unit_no[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_unit_no"/> -->
        </div>
        <div class="col-md-9">
          <base-input :label="$t('property.addressLine')"
                      :placeholder="$t('property.addressLine')"
                      v-model="resource.model.location_details.asset_address_line"
                      v-if="resource.model.location_details"
                      :disabled="true">
          </base-input>
          <!-- :error="tmpApiValidationErrors.asset_address_line ? tmpApiValidationErrors.asset_address_line[0] : ''" -->
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_address_line"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input :label="$t('property.city')"
                      :placeholder="$t('property.city')"
                      v-model="resource.model.location_details.asset_city"
                      v-if="resource.model.location_details"
                      :disabled="true"
                      >
          </base-input>
          <!-- :error="tmpApiValidationErrors.asset_city ? tmpApiValidationErrors.asset_city[0] : ''" -->
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_city"/> -->
        </div>
        <div class="col-md-4">
          <base-input :label="$t('property.state')"
                      :placeholder="$t('property.state')"
                      v-model="resource.model.location_details.asset_state"
                      v-if="resource.model.location_details"
                      :disabled="true"
                      >
          </base-input>
          <!-- :error="tmpApiValidationErrors.asset_state ? tmpApiValidationErrors.asset_state[0] : ''" -->
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_state"/> -->
        </div>
        <div class="col-md-4">
          <base-input :label="$t('property.postalCode')"
                      :placeholder="$t('property.postalCode')"
                      v-model="resource.model.location_details.asset_postal_code"
                      v-if="resource.model.location_details"
                      :disabled="true"
                      >
          </base-input>
          <!-- :error="tmpApiValidationErrors.asset_postal_code ? tmpApiValidationErrors.asset_postal_code[0] : ''" -->
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_postal_code"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <!-- <base-input :label="$t('property.country')"
                      :placeholder="$t('property.country')"
                      v-model="resource.model.location_details.asset_country"
                      v-if="resource.model.location_details"
                      :disabled="true"
                      >
          </base-input> -->
          <base-selector-input :label="$t('property.country')"
                               :placeholder="$t('property.country')"
                               v-model="resource.model.location_details.asset_country"
                               :options="resource.selector.asset_country"
                               v-if="resource.model.location_details"
                               :disabled="true"
                               >
          </base-selector-input>
          <!-- :error="tmpApiValidationErrors.asset_country ? tmpApiValidationErrors.asset_country[0] : ''" -->
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_country"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <base-input :label="$t('component.search')"
                      :placeholder="$t('component.search')"
                      v-model="googleMapSearchInput"
                      v-if="resource.model.location_details"
                      id="assetLocationAddSearchInput"
                      :error="tmpApiValidationErrors.asset_address_line ? tmpApiValidationErrors.asset_address_line[0] : ''">
          </base-input>
          <div id="assetLocationAddMap" class="map mt-3"></div>
        </div>
      </div>
    </card>

    <card>
      <h5 slot="header" class="title">{{$t('property.financialDetails')}}</h5>
      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.assetPurchasedValue')"
                      :placeholder="$t('property.assetPurchasedValue')"
                      type="number"
                      v-model="resource.model.financial_details.asset_purchased_value"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_purchased_value ? tmpApiValidationErrors.asset_purchased_value[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_value"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.assetCurrentValue')"
                      :placeholder="$t('property.assetCurrentValue')"
                      type="number"
                      v-model="resource.model.financial_details.asset_current_value"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_current_value ? tmpApiValidationErrors.asset_current_value[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_current_value"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.assetPurchasedTax')"
                      :placeholder="$t('property.assetPurchasedTax')"
                      type="number"
                      v-model="resource.model.financial_details.asset_purchased_tax"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_purchased_tax ? tmpApiValidationErrors.asset_purchased_tax[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_tax"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.assetRemainingLoan')"
                      :placeholder="$t('property.assetRemainingLoan')"
                      type="number"
                      v-model="resource.model.financial_details.loan_outstanding_amount"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_outstanding_amount ? tmpApiValidationErrors.loan_outstanding_amount[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_outstanding_amount"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.purchasedDate')"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.purchased_date ? tmpApiValidationErrors.purchased_date[0] : ''">
                      <!-- type="date"
                      v-model="resource.model.financial_details.purchased_date" -->
              <el-date-picker
                type="date"
                :placeholder="$t('property.purchasedDate')"
                v-model="resource.model.financial_details.purchased_date"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.purchased_date"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.loanInterestRate')"
                      :placeholder="$t('property.loanInterestRate')"
                      type="number"
                      v-model="resource.model.financial_details.loan_interest_rate"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_interest_rate ? tmpApiValidationErrors.loan_interest_rate[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_interest_rate"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.loanTotalYear')"
                      :placeholder="$t('property.loanTotalYear')"
                      type="number"
                      v-model="resource.model.financial_details.loan_total_year"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_total_year ? tmpApiValidationErrors.loan_total_year[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_total_year"/> -->
        </div>
        <!-- <div class="col-md-6">
          <base-input :label="$t('property.loanRemainingYear')"
                      :placeholder="$t('property.loanRemainingYear')"
                      type="number"
                      v-model="resource.model.financial_details.loan_remaining_year"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_remaining_year ? tmpApiValidationErrors.loan_remaining_year[0] : ''">
          </base-input>
        </div> -->
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleCancel()" fill>{{$t('component.cancel')}}</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card } from "@/components";

import { GOOGLE_MAP_API_KEY } from "@/pages/Maps/API_KEY";
import {Loader} from "google-maps";

const GoogleMapLoader = new Loader(
  GOOGLE_MAP_API_KEY, 
  {
    region: "MY",
    libraries: ["places"]
  }
);

export default {
  mixins: [formMixin],
  components: {
    BaseInput,
    BaseSelectorInput,
    Card,
    // ValidationError
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        model: {},
        data: {},
        selector: {}
      },
      description: "Resource info"
    },
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    addOrEdit: {
      type: String,
      required: true,
      default: "Add"
    }
  },
  data() {
    return {
      googleMapSearchInput: ""
    }
  },
  mounted() {
    // if (this.addOrEdit == 'Add') {
      setTimeout(this.initAddGoogleMap, 500);
    // } else {
    //   setTimeout(this.initEditGoogleMap, 500);
    // }
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.translateModel(this.resource.model));
    },
    async handleCancel() {
      this.$emit('cancel');
    },
    translateModel(model) {
      return {
        asset_nickname: this.resource.model.asset_nickname,
        asset_type: this.resource.model.asset_type,
        asset_ownership_type: this.resource.model.asset_ownership_type,
        asset_size: this.resource.model.asset_size,
        number_of_rooms: this.resource.model.number_of_rooms,
        number_of_bathrooms: this.resource.model.number_of_bathrooms,
        is_multi_unit: this.resource.model.is_multi_unit == null ? false : this.resource.model.is_multi_unit,
        is_occupied: this.resource.model.is_occupied == null ? false : this.resource.model.is_occupied,
        asset_unit_no: this.resource.model.location_details.asset_unit_no,
        asset_address_line: this.resource.model.location_details.asset_address_line,
        asset_city: this.resource.model.location_details.asset_city,
        asset_state: this.resource.model.location_details.asset_state,
        asset_postal_code: this.resource.model.location_details.asset_postal_code,
        asset_country: this.resource.model.location_details.asset_country,
        asset_purchased_value: this.resource.model.financial_details.asset_purchased_value,
        asset_current_value: this.resource.model.financial_details.asset_current_value,
        asset_purchased_tax: this.resource.model.financial_details.asset_purchased_tax,
        loan_outstanding_amount: this.resource.model.financial_details.loan_outstanding_amount,
        purchased_date: this.resource.model.financial_details.purchased_date,
        loan_interest_rate: this.resource.model.financial_details.loan_interest_rate,
        loan_total_year: this.resource.model.financial_details.loan_total_year,

        place_id: this.resource.model.place_id,
        // loan_remaining_year: this.resource.model.financial_details.loan_remaining_year,
      }
    },
    initAddGoogleMap() {
      GoogleMapLoader.load().then(google => {
        const defaultLatLng = {lat: 3.158310, lng: 101.711710};
        const mapOptions = {
          zoom: 10,
          center: defaultLatLng,
          scrollwheel: false
        };

        let map = new google.maps.Map(
          document.getElementById("assetLocationAddMap"),
          mapOptions
        );

        let markers = [];
        if (this.addOrEdit == 'Edit') {
          this.googleMapSearchInput = this.resource.model.location_details.asset_address_line;
          let tmpPlaceId = this.resource.model.place_id;
          let isGeocoderNeeded = true;
          if (tmpPlaceId) {
            let tmpLatLng = JSON.parse(tmpPlaceId);
            if (tmpLatLng) {
              if (tmpLatLng.lat && tmpLatLng.lng) {
                map.setCenter(tmpLatLng);
                map.setZoom(16);

                new google.maps.Marker({
                  position: tmpLatLng,
                  map: map,
                  title: this.googleMapSearchInput
                });
                isGeocoderNeeded = false;
              }
            }
          }
          if (isGeocoderNeeded) {
            const geocoder = new google.maps.Geocoder();
            if (geocoder) {
              let tmpAddress = this.googleMapSearchInput;
              geocoder.geocode({
                'address': tmpAddress
              }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    map.setCenter({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()});
                    map.setZoom(16);

                    markers.push(new google.maps.Marker({
                      position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
                      map: map,
                      title: tmpAddress
                    }));
                  } 
                  // else {
                  //   alert("No results found");
                  // }
                } 
                // else {
                //   alert("Geocode was not successful for the following reason: " + status);
                // }
              });
            }
          }
        }

        const input = document.getElementById("assetLocationAddSearchInput");
        const defaultBounds = {
          north: defaultLatLng.lat + 0.1,
          south: defaultLatLng.lat - 0.1,
          east: defaultLatLng.lng + 0.1,
          west: defaultLatLng.lng - 0.1,
        };
        const options = {
          bounds: defaultBounds,
          componentRestrictions: { country: "my" },
          fields: ["address_components", "geometry", "name"],
          strictBounds: false,
          types: ["establishment"],
        };
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.setComponentRestrictions({
          country: ["my"],
        });

        autocomplete.addListener("place_changed", () => {
          let place = autocomplete.getPlace();
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          markers = [];
          const bounds = new google.maps.LatLngBounds();
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
          // this.googleMapSearchInput = place.name;
          if (!this.decodeGoogleMapPlace(place)) {
            return;
          }
          this.resource.model.place_id = `{"lat":${place.geometry.location.lat()},"lng":${place.geometry.location.lng()}}`;
          markers.push(
            new google.maps.Marker({
              map,
              title: place.name,
              position: place.geometry.location,
            })
          );
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
          map.fitBounds(bounds);
        });


        // const searchBox = new google.maps.places.SearchBox(input);
        // // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // // map.addListener("bounds_changed", () => {
        // //   searchBox.setBounds(map.getBounds());
        // // });
        
        // searchBox.addListener("places_changed", () => {
        //   const places = searchBox.getPlaces();

        //   if (places.length == 0) {
        //     return;
        //   }
        //   markers.forEach((marker) => {
        //     marker.setMap(null);
        //   });
        //   markers = [];
        //   const bounds = new google.maps.LatLngBounds();
        //   places.forEach((place) => {
        //     if (!place.geometry || !place.geometry.location) {
        //       console.log("Returned place contains no geometry");
        //       return;
        //     }
        //     this.googleMapSearchInput = place.name;
        //     // this.decodeGoogleMapPlace(place)
        //     if (!this.decodeGoogleMapPlace(place)) {
        //       return;
        //     }
        //     this.resource.model.place_id = `{"lat":${place.geometry.location.lat()},"lng":${place.geometry.location.lng()}}`;
        //     markers.push(
        //       new google.maps.Marker({
        //         map,
        //         title: place.name,
        //         position: place.geometry.location,
        //       })
        //     );

        //     if (place.geometry.viewport) {
        //       bounds.union(place.geometry.viewport);
        //     } else {
        //       bounds.extend(place.geometry.location);
        //     }
        //   });
        //   map.fitBounds(bounds);
        // });


      });
    },
    // initEditGoogleMap() {
    //   GoogleMapLoader.load().then(google => {
    //     const defaultLatLng = {lat: 3.158310, lng: 101.711710};
    //     const mapOptions = {
    //       zoom: 10,
    //       center: defaultLatLng,
    //       scrollwheel: false
    //     };

    //     let map = new google.maps.Map(
    //       document.getElementById("assetLocationAddMap"),
    //       mapOptions
    //     );

    //     const input = document.getElementById("assetLocationAddSearchInput");
    //     const searchBox = new google.maps.places.SearchBox(input);
    //     // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //     // map.addListener("bounds_changed", () => {
    //     //   searchBox.setBounds(map.getBounds());
    //     // });
    //     let markers = [];
    //     searchBox.addListener("places_changed", () => {
    //       const places = searchBox.getPlaces();

    //       if (places.length == 0) {
    //         return;
    //       }
    //       markers.forEach((marker) => {
    //         marker.setMap(null);
    //       });
    //       markers = [];
    //       const bounds = new google.maps.LatLngBounds();
    //       places.forEach((place) => {
    //         if (!place.geometry || !place.geometry.location) {
    //           console.log("Returned place contains no geometry");
    //           return;
    //         }
    //         this.googleMapSearchInput = place.name;
    //         // this.decodeGoogleMapPlace(place)
    //         if (!this.decodeGoogleMapPlace(place)) {
    //           return;
    //         }
    //         markers.push(
    //           new google.maps.Marker({
    //             map,
    //             title: place.name,
    //             position: place.geometry.location,
    //           })
    //         );

    //         if (place.geometry.viewport) {
    //           bounds.union(place.geometry.viewport);
    //         } else {
    //           bounds.extend(place.geometry.location);
    //         }
    //       });
    //       map.fitBounds(bounds);
    //     });
    //   });
    // },
    decodeGoogleMapPlace(place) {
      if (!place.address_components) {
        return false;
      }
      this.resource.model.location_details.asset_address_line = "";
      addressComp: for (let i = 0; i < place.address_components.length; i++) {
        addressCompType: for (let j = 0; j < place.address_components[i].types.length; j++) {
          switch (place.address_components[i].types[j]) {
            case 'country':
              // if (place.address_components[i].short_name != 'MY') {
              //   // this.$notify({
              //   //   message: this.$t('alert.assetLocationNotValid'),
              //   //   icon: 'tim-icons icon-bell-55',
              //   //   type: 'danger'
              //   // });
              //   return false;
              // }
              this.resource.model.location_details.asset_country = place.address_components[i].short_name;
              break addressCompType;
            case 'postal_code':
              this.resource.model.location_details.asset_postal_code = place.address_components[i].long_name;
              break addressCompType;
            case 'administrative_area_level_1':
              this.resource.model.location_details.asset_state = place.address_components[i].long_name;
              break addressCompType;
            case 'locality':
              this.resource.model.location_details.asset_city = place.address_components[i].long_name;
              break addressCompType;
            case 'route':
              this.resource.model.location_details.asset_address_line = place.name + ", " + place.address_components[i].long_name;
              break addressCompType;
            case 'sublocality_level_1':
              if (this.resource.model.location_details.asset_address_line) {
                this.resource.model.location_details.asset_address_line += ", " + place.address_components[i].long_name;
              } else {
                this.resource.model.location_details.asset_address_line = place.name + ", " + place.address_components[i].long_name;
              }
              break addressCompType;
            default:
              continue addressCompType;
          }
        }
      }
      return true;
    },
  }
}
</script>
<style></style>