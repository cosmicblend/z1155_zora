export interface NftItem {
    chain: string;
    contract_address: string;
    token_id: string;
    nft_details: {
      name: string;
      description: string | null;
      previews: {
        image_small_url: string;
        image_medium_url: string;
        image_large_url: string;
        image_opengraph_url: string;
        predominant_color: string;
      },
      image_url: string | null;
      image_properties: {
        width: number;
        height: number;
        mime_type: string;
      } | null;
      // todo: video_url: string | null;
      // todo: video_properties: string | null;
      // todo: audio_ur: string | null;
      // todo: audio_properties: string | null;
      // todo: model_url: string | null;
      // todo: model_properties: string | null;
      // todo: other_url: string | null;
      // todo: other_properties: string | null;
      background_color: string | null;
      external_url: string | null;
      created_date: string;
      contract: {
        type: string;
        owned_by: string;
        has_multiple_collections: boolean;
      };
    };
  }
  
  export interface ApiResponse {
    transfers: NftItem[];
    //next_cursor?: string;
    //previous?: string;
  }
  