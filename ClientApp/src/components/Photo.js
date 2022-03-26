import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { url } from '../utils/CloudinaryService';
import PhotoThumbnails from './PhotoThumbnails';
import {CloudinaryContext} from 'cloudinary-react';
import {Cloudinary} from "@cloudinary/url-gen";
import config from '../config/config';

// Import plugins
import {AdvancedImage, lazyload, accessibility, responsive, placeholder} from '@cloudinary/react';
import {grayscale} from "@cloudinary/url-gen/actions/effect";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
const {cloud_name, upload_preset} = config;
class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { showMore: false };
    }

    render() {
        const options = { ...this.context, ...this.props };
        const urlPath = url(options.publicId, options);

        // Create and configure your Cloudinary instance.
        const cld = new Cloudinary({
            cloud: {
            cloudName: cloud_name
            }
        }); 

        function getImg(publicId){
            // Use the image with public ID.
            const myimage = cld.image(publicId,{quality:'auto'});
            return myimage.resize(fill().width(250).height(250).gravity(focusOn(FocusOn.faces()))).effect(grayscale());
        }
        return (
            <div className="photoContainer">
                {this.props.context && (
                    <h2>{this.props.context.custom.photo}</h2>
                )}
                {
                    <AdvancedImage cldImg={getImg(this.props.publicId)}
					plugins={[responsive()]}/>
                }
                {/* <a href={urlPath} target="_blank" rel="noopener noreferrer">
                    
                    <Image
                        publicId={this.props.publicId}
                        className="thumbnail inline"
                        effect="grayscale"
                        width="150"
                        height="150"
                        crop="fill"
                        quality="80"
                    >
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                </a> */}
                {!this.state.showMore && (
                    <div className="less_info">
                        <button
                            className="toggle_info"
                            onClick={this.showMore.bind(this)}
                        >
                            Show transformations
                        </button>
                    </div>
                )}

                {this.state.showMore && (
                    <div className="more_info">
                        <button
                            className="toggle_info"
                            onClick={this.showLess.bind(this)}
                        >
                            Hide transformations
                        </button>
                        <PhotoThumbnails publicId={this.props.publicId} />
                    </div>
                )}
            </div>
        );
    }

    showMore() {
        this.setState({ showMore: true });
    }

    showLess() {
        this.setState({ showMore: false });
    }

    static contextType = CloudinaryContext.contextType;
}

Photo.propTypes = {
    context: PropTypes.object,
    publicId: PropTypes.string,
};

export default Photo;
